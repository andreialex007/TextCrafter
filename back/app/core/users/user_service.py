from sqlalchemy import select

from common.models.service_base import ServiceBase
from core.users.user import User
from core.users.user_dto import UserDto


class UserService(ServiceBase):
    async def get_by_id(self, id: int) -> UserDto:
        user = (await self.db.execute(select(User).filter(User.id == id))).scalars().one()
        return UserDto(id=user.id, name=user.name)

