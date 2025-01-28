# Static utility class for mapping
from typing import List

from common.database import Setting
from core.settings.setting_dto import SettingDto


class SettingMapper:
    @staticmethod
    def to_setting_dto(setting: Setting) -> SettingDto:
        return SettingDto(
            id=setting.id,
            user_id=setting.user_id,
            name=setting.name,
            value=setting.value,
        )

    @staticmethod
    def to_setting_dto_list(settings: List[Setting]) -> List[SettingDto]:
        return [SettingMapper.to_setting_dto(setting) for setting in settings]
