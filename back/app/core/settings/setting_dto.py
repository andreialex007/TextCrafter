from common.models.dto_base import DtoBase


class SettingDto(DtoBase):
    user_id: int
    name: str
    value: str
