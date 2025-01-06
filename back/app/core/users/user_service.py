from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from common.database import get_db
from common.models.service_base import ServiceBase
from core.users.user import User
from core.users.user_dto import UserDto

def get_user_service(db: Session = Depends(get_db)):
    return UserService(db)

class UserService(ServiceBase):
    async def get_by_id(self, id: int) -> UserDto:
        user = (await self.db.execute(select(User).filter(User.id == id))).scalars().one()
        return UserDto(id=user.id, name=user.name)

