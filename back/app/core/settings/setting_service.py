from typing import List, Optional
from fastapi import Depends
from functional import seq
from sqlalchemy import select
from sqlalchemy.orm import Session
from common.database import get_db, Setting, User
from common.models.service_base import ServiceBase
from core.settings.setting_dto import SettingDto, CreateSettingDto, UpdateSettingDto
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

    async def get_by_user_id(self, user_id: int) -> List[SettingDto]:
        result = await self.db.execute(select(Setting).filter(Setting.user_id == user_id))
        settings = result.scalars().all()
        return (seq(settings)
                .select(lambda x: SettingMapper.to_setting_dto(x))
                .to_list())

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

    async def update(self, id: int, setting_data: UpdateSettingDto) -> SettingDto:
        setting = (
            (await self.db.execute(select(Setting).filter(Setting.id == id)))
            .scalar_one()
        )
        setting.name = setting_data.name
        setting.value = setting_data.value
        await self.db.commit()
        await self.db.refresh(setting)
        return SettingMapper.to_setting_dto(setting)

    async def delete(self, id: int) -> None:
        setting = (
            (await self.db.execute(select(Setting).filter(Setting.id == id)))
            .scalar_one()
        )
        await self.db.delete(setting)
        await self.db.commit()
