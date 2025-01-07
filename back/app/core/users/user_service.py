from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from common.database import get_db, User
from common.models.service_base import ServiceBase
from core.users.user_dto import UserDto


def get_user_service(db: Session = Depends(get_db)):
    return UserService(db)


class UserService(ServiceBase):
    async def get_by_id(self, id: int) -> UserDto:
        user = (await self.db.execute(select(User).filter(User.id == id))).scalar_one()
        return UserDto(id=user.id, name=user.name)

    async def get_by_name(self, name: str) -> UserDto:
        user = (await self.db.execute(select(User).filter(User.name == name))).scalar_one()
        return UserDto(id=user.id, name=user.name)

    async def login(self, name: str, password: str) -> UserDto:
        user = (await self.db.execute(select(User).filter(
            User.name == name and
            User.hashed_password == self.fake_hash_password(password)
        ))).scalar_one()
        return UserDto(id=user.id, name=user.name)

    def fake_hash_password(password: str):
        return f"fakehashed{password}"
