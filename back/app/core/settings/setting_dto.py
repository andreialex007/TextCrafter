from enum import Enum, auto
from typing import Optional

from common.models.dto_base import DtoIdBase


class SettingDto(DtoIdBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    value: Optional[str] = None


class CreateSettingDto(DtoIdBase):
    user_id: int
    name: str
    value: str


class UpdateSettingDto(DtoIdBase):
    name: str
    value: str


class UserSettings(Enum):
    def __init__(self, value, description):
        self._value_ = value
        self.description = description

    @property
    def get_description(self):
        return self.description

    AI_API_KEY = auto(), "API key for accessing the AI service"
    OPTIONS_NUMBER = auto(), "Number of options presented to the user"
    COMMON_SUGGESTION = auto(), "Common suggestions used in recommendations"


UserSettings.ALL_SETTINGS = [setting for setting in UserSettings]
