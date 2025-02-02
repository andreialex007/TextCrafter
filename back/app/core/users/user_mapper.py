# Static utility class for mapping
from typing import List

from common.database import Setting, User
from core.users.user_dto import UserDto


class UserMapper:
    @staticmethod
    def to_user_dto(user: User) -> UserDto:
        return UserDto(
            id=user.id,
            role=user.role,
            name=user.name,
            email=user.email,
            password=""
        )

    @staticmethod
    def to_user_dto_list(users: List[User]) -> List[UserDto]:
        return [UserMapper.to_user_dto(x) for x in users]
