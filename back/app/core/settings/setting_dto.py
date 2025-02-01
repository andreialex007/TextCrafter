from common.models.dto_base import DtoIdBase


class SettingDto(DtoIdBase):
    id: int
    user_id: int
    name: str
    value: str


class CreateSettingDto(DtoIdBase):
    user_id: int
    name: str
    value: str


class UpdateSettingDto(DtoIdBase):
    name: str
    value: str
