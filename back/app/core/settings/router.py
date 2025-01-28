from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from core.auth.router import security
from core.settings.setting_dto import SettingDto, CreateSettingDto, UpdateSettingDto
from core.settings.setting_service import get_setting_service, SettingService

router = APIRouter(prefix="/settings",
                   tags=["settings"],
                   dependencies=[Depends(security)])


@router.get("/{setting_id}", response_model=SettingDto)
async def get_setting_by_id(
        setting_id: int,
        setting_service: SettingService = Depends(get_setting_service),
):
    try:
        return await setting_service.get_by_id(setting_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Setting with ID {setting_id} not found",
        )


@router.get("/user/{user_id}", response_model=List[SettingDto])
async def get_settings_by_user_id(
        user_id: int,
        setting_service: SettingService = Depends(get_setting_service),
):
    return await setting_service.get_by_user_id(user_id)


@router.post("/", response_model=SettingDto, status_code=status.HTTP_201_CREATED)
async def create_setting(
        setting_data: CreateSettingDto,
        setting_service: SettingService = Depends(get_setting_service),
):
    return await setting_service.add(setting_data)


@router.put("/{setting_id}", response_model=SettingDto)
async def update_setting(
        setting_id: int,
        setting_data: UpdateSettingDto,
        setting_service: SettingService = Depends(get_setting_service),
):
    return await setting_service.update(setting_id, setting_data)


@router.delete("/{setting_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_setting(
        setting_id: int,
        setting_service: SettingService = Depends(get_setting_service),
):
    await setting_service.delete(setting_id)
