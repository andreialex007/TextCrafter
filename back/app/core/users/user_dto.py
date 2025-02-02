from common.models.dto_base import DtoIdBase


class UserDto(DtoIdBase):
    name: str
    email: str
    role: str


class CreateUserDto(DtoIdBase):
    name: str
    email: str
    role: str
    password: str
