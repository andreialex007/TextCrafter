from common.models.dto_base import DtoIdBase


class UserDto(DtoIdBase):
    name: str
    email: str
    role: str

    def isAdmin(self):
        return self.role == "admin"


class CreateUserDto(DtoIdBase):
    name: str
    email: str
    role: str
    password: str
