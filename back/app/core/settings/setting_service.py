from typing import List, Optional
from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from common.database import get_db, Setting, User
from common.models.service_base import ServiceBase
from core.settings.setting_dto import SettingDto, CreateSettingDto, UpdateSettingDto


def get_setting_service(db: Session = Depends(get_db)):
    return SettingService(db)


class SettingService(ServiceBase):
    async def get_by_id(self, id: int) -> SettingDto:
        setting = (
            (await self.db.execute(select(Setting).filter(Setting.id == id)))
            .scalar_one()
        )
        return SettingDto(
            id=setting.id,
            user_id=setting.user_id,
            name=setting.name,
            value=setting.value,
        )

    async def get_by_user_id(self, user_id: int) -> List[SettingDto]:
        result = await self.db.execute(select(Setting).filter(Setting.user_id == user_id))
        settings = result.scalars().all()
        return [
            SettingDto(
                id=setting.id,
                user_id=setting.user_id,
                name=setting.name,
                value=setting.value,
            )
            for setting in settings
        ]

    async def get_by_name_and_user_id(self, name: str, user_id: int) -> SettingDto:
        setting = (
            (await self.db.execute(
                select(Setting).filter(Setting.name == name, Setting.user_id == user_id)
            ))
            .scalar_one()
        )
        return SettingDto(
            id=setting.id,
            user_id=setting.user_id,
            name=setting.name,
            value=setting.value,
        )

    async def add_setting(self, setting_data: CreateSettingDto) -> SettingDto:
        new_setting = Setting(
            user_id=setting_data.user_id,
            name=setting_data.name,
            value=setting_data.value,
        )
        self.db.add(new_setting)
        await self.db.commit()
        await self.db.refresh(new_setting)
        return SettingDto(
            id=new_setting.id,
            user_id=new_setting.user_id,
            name=new_setting.name,
            value=new_setting.value,
        )

    async def update_setting(self, id: int, setting_data: UpdateSettingDto) -> SettingDto:
        """
        Update an existing setting by ID.
        """
        setting = (
            (await self.db.execute(select(Setting).filter(Setting.id == id)))
            .scalar_one()
        )
        if setting_data.name:
            setting.name = setting_data.name
        if setting_data.value:
            setting.value = setting_data.value
        await self.db.commit()
        await self.db.refresh(setting)
        return SettingDto(
            id=setting.id,
            user_id=setting.user_id,
            name=setting.name,
            value=setting.value,
        )

    async def delete_setting(self, id: int) -> None:
        setting = (
            (await self.db.execute(select(Setting).filter(Setting.id == id)))
            .scalar_one()
        )
        await self.db.delete(setting)
        await self.db.commit()
