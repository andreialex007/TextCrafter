from typing import List, cast

from fastapi import Depends
from functional import seq
from sqlalchemy import select
from sqlalchemy.orm import Session

from common.database import get_db, User
from common.models.service_base import ServiceBase
from core.auth.auth_utils import AuthUtils
from core.users.user_dto import UserDto, CreateUserDto


def get_user_service(db: Session = Depends(get_db)):
    return UserService(db)


class UserService(ServiceBase):
    async def get_by_id(self, id: int) -> UserDto:
        user = ((await self.db.execute(select(User).filter(User.id == id)))
                .scalar_one())
        return UserDto(id=user.id, name=user.name, role=user.role)

    async def get_by_name(self, name: str) -> UserDto:
        user = ((await self.db.execute(select(User).filter(User.name == name)))
                .scalar_one())
        return UserDto(id=user.id, name=user.name, role=user.role)

    async def get_users_by_role(self, role: str) -> List[UserDto]:
        result = (await self.db.execute(select(User).filter(User.role == role)))
        users = (seq(result.scalars().all())
                 .map(lambda x: cast(User, x))
                 .map(lambda user: UserDto(id=user.id, name=user.name, role=user.role))
                 .to_list())
        return users

    async def add_user(self, user_data: CreateUserDto) -> UserDto:
        new_user = User(
            name=user_data.name,
            email=user_data.email,
            role=user_data.role,
            hashed_password=self.fake_hash_password(user_data.password),
            is_active=True
        )
        self.db.add(new_user)
        await self.db.commit()
        await self.db.refresh(new_user)
        return UserDto(id=new_user.id, name=new_user.name, role=new_user.role)

    async def get_current_user(self, token: str) -> UserDto:
        payload = AuthUtils.decode(token)
        id: str = payload.get("id")
        user = self.get_by_id(id)
        return user

    async def login(self, name: str, password: str) -> UserDto:
        user = (await self.db.execute(select(User).filter(
            User.name == name and
            User.hashed_password == self.fake_hash_password(password)
        ))).scalar_one()
        return UserDto(id=user.id, name=user.name, role=user.role)

    def fake_hash_password(self, password: str):
        return f"fakehashed{password}"
