# Static utility class for mapping
from common.database import Setting
from core.settings.setting_dto import SettingDto


class SettingMapper:
    @staticmethod
    def to_setting_dto(setting: Setting) -> SettingDto:
        """
        Map a Setting model instance to a SettingDto instance.
        """
        return SettingDto(
            id=setting.id,
            user_id=setting.user_id,
            name=setting.name,
            value=setting.value,
        )

    @staticmethod
    def to_setting_dto_list(settings: List[Setting]) -> List[SettingDto]:
        """
        Map a list of Setting model instances to a list of SettingDto instances.
        """
        return [SettingMapper.to_setting_dto(setting) for setting in settings]
