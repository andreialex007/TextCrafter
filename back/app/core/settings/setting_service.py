from typing import List

from fastapi import Depends
from functional import seq
from pydash import to_dict
from sqlalchemy import select
from sqlalchemy.orm import Session

from common.database import get_db, Setting
from common.models.service_base import ServiceBase
from core.settings.setting_dto import SettingDto, CreateSettingDto, UpdateSettingDto, \
    UserSettings
from core.settings.settings_mapper import SettingMapper


def get_setting_service(db: Session = Depends(get_db)):
    return SettingService(db)


class SettingService(ServiceBase):
    async def get_by_id(self, id: int) -> SettingDto:
        setting = (
            (await self.db.execute(select(Setting).filter(Setting.id == id)))
            .scalar_one()
        )
        return SettingMapper.to_setting_dto(setting)

    async def get_by_user_id_raw(self, user_id: int) -> List[SettingDto]:
        result = await self.db.execute(select(Setting).filter(Setting.user_id == user_id))
        settings = result.scalars().all()
        return settings

    async def get_by_user_id(self, user_id: int) -> List[SettingDto]:
        settings = await self.get_by_user_id_raw(user_id)
        all_settings = UserSettings.ALL_SETTINGS

        db_settings = (
            seq(settings)
            .select(lambda x: SettingMapper.to_setting_dto(x))
            .to_list()
        )

        settings_db_dict = (seq(db_settings).select(lambda x: (x.name, x)).to_dict())
        settings_all_dict = (seq(all_settings).select(lambda x: (x.name, x)).to_dict())

        for key in settings_all_dict:
            current_db: SettingDto = settings_db_dict.get(key)
            current_all: SettingDto = settings_all_dict.get(key)
            if current_db is None:
                new_setting = SettingDto(
                    id=None,
                    user_id=user_id,
                    name=current_all.name,
                    value="",
                    description=current_all.description
                )
                db_settings.append(new_setting)
            if current_db is not None:
                current_db.description = current_all.description
        return sorted(db_settings, key=lambda x: x.name)

    async def get_by_name_and_id(self, name: str, user_id: int) -> SettingDto:
        setting = (
            (await self.db.execute(
                select(Setting).filter(Setting.name == name, Setting.user_id == user_id)
            ))
            .scalar_one()
        )
        return SettingMapper.to_setting_dto(setting)

    async def add(self, setting_data: CreateSettingDto) -> SettingDto:
        new_setting = Setting(
            user_id=setting_data.user_id,
            name=setting_data.name,
            value=setting_data.value,
        )
        self.db.add(new_setting)
        await self.db.commit()
        await self.db.refresh(new_setting)
        return SettingMapper.to_setting_dto(new_setting)

    async def update(self, user_id: int, new_settings: List[SettingDto]):
        existing_settings = await self.get_by_user_id_raw(user_id)
        existing_settings_dict = dict((s.name, s) for s in existing_settings)
        new_settings_dict = dict((x.name, x) for x in new_settings)

        for setting in existing_settings_dict:
            existing: SettingDto = existing_settings_dict.get(setting)
            input: SettingDto = new_settings_dict.get(setting)
            if input == None:
                continue
            if not existing.id:
                self.db.add(
                    Setting(user_id=user_id, name=existing.name, value=input.value))
            if existing.id:
                existing.value = input.value
        await self.db.commit()
