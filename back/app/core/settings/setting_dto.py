from common.models.dto_base import DtoBase


class SettingDto(DtoBase):
    id: int
    user_id: int
    name: str
    value: str


class CreateSettingDto(DtoBase):
    user_id: int
    name: str
    value: str


class UpdateSettingDto(DtoBase):
    name: str
    value: str
