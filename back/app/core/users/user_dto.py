from common.models.dto_base import DtoBase


class UserDto(DtoBase):
    id: int
    name: str
    role: str


class CreateUserDto(DtoBase):
    name: str
    email: str
    role: str
    password: str
