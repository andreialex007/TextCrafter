from enum import Enum, auto
from typing import Optional

from common.models.dto_base import DtoIdBase


class SettingDto(DtoIdBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    name: Optional[str] = None
    value: Optional[str] = None


class CreateSettingDto(DtoIdBase):
    user_id: int
    name: str
    value: str


class UpdateSettingDto(DtoIdBase):
    name: str
    value: str


class UserSettings(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name

    AI_API_KEY = auto()
    OPTIONS_NUMBER = auto()
    COMMON_SUGGESTION = auto()


UserSettings.ALL_SETTINGS = [setting for setting in UserSettings]
