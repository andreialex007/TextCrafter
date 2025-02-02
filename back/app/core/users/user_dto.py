from typing import Optional

from common.models.dto_base import DtoIdBase


class UserDto(DtoIdBase):
    name: str
    email: str
    password: Optional[str] = None
    role: str

    @property
    def isAdmin(self) -> bool:
        return self.role == "admin"


class CreateUserDto(DtoIdBase):
    name: str
    email: str
    role: str
    password: str
