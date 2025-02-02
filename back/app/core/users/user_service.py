from typing import List, cast, Dict, Any, Tuple, Optional

from fastapi import Depends
from functional import seq
from sqlalchemy import select, func, update, delete
from sqlalchemy.orm import Session

from common.database import get_db, User
from common.models.service_base import ServiceBase
from core.auth.auth_utils import AuthUtils
from core.users.user_dto import UserDto, CreateUserDto
from core.users.user_mapper import UserMapper


def get_user_service(db: Session = Depends(get_db)):
    return UserService(db)


class UserService(ServiceBase):
    async def get_by_id(self, id: int) -> UserDto:
        user = ((await self.db.execute(select(User).filter(User.id == id)))
                .scalar_one())
        return UserMapper.to_user_dto(user)

    async def get_by_name(self, name: str) -> UserDto:
        user = ((await self.db.execute(select(User).filter(User.name == name)))
                .scalar_one())
        return UserMapper.to_user_dto(user)

    async def get_users_by_role(self, role: str) -> List[UserDto]:
        result = (await self.db.execute(select(User).filter(User.role == role)))
        users = (seq(result.scalars().all())
                 .map(lambda x: UserMapper.to_user_dto(x))
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

    async def update_user(self, user_dto: UserDto) -> Optional[UserDto]:
        try:
            statement = (
                update(User)
                .where(User.id == user_dto.id)
                .values(
                    name=user_dto.name,
                    email=user_dto.email,
                    role=user_dto.role
                )
                .returning(User)
            )
            result = await self.db.execute(statement)
            await self.db.commit()
            updated_user = result.scalar_one_or_none()

            if not updated_user:
                return None
            return UserMapper.to_user_dto(updated_user)

        except Exception as e:
            await self.db.rollback()
            raise e

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
        return UserMapper.to_user_dto(user)

    async def search_users(
            self, filters: Dict[str, Any], take: int, skip: int
    ) -> Tuple[List[UserDto], int, int]:
        base_query = select(User)
        filtered_query = base_query

        for field in ["id", "name", "email", "role"]:
            filter_value = filters.get(field)
            if filter_value is not None:
                if field == "id":
                    filtered_query = filtered_query.filter(
                        getattr(User, field) == filter_value
                    )
                else:
                    filtered_query = filtered_query.filter(
                        getattr(User, field).ilike(f"%{filter_value}%")
                    )

        total_non_filtered_count = await self.db.scalar(
            select(func.count()).select_from(User)
        )

        total_filtered_count = await self.db.scalar(
            select(func.count()).select_from(filtered_query.subquery())
        )

        paginated_query = filtered_query.offset(skip).limit(take)
        result = await self.db.execute(paginated_query)
        users = result.scalars().all()

        user_dtos = (
            seq(users)
            .map(lambda x: UserDto(id=x.id, name=x.name, role=x.role, email=x.email))
            .to_list()
        )

        return user_dtos, total_non_filtered_count, total_filtered_count

    async def delete_user(self, user_id: int) -> bool:
        statement = (
            delete(User)
            .where(User.id == user_id)
            .returning(User.id)
        )
        result = await self.db.execute(statement)
        await self.db.commit()
        deleted_user = result.scalar_one_or_none()
        return deleted_user is not None

    def fake_hash_password(self, password: str):
        return f"fakehashed{password}"
