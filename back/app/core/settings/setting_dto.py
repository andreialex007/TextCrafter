from common.models.entity_base import EntityBase


class SettingDto(EntityBase):
    user_id: int
    name: str
    value: str
