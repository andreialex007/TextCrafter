from typing import List

from fastapi import APIRouter, Depends
from fastapi.openapi.models import Response
from starlette.responses import JSONResponse

from core.auth.auth_utils import get_current_user_id
from core.auth.security import security
from core.settings.setting_dto import SettingDto, CreateSettingDto
from core.settings.setting_service import get_setting_service, SettingService

router = APIRouter(prefix="/settings",
                   tags=["settings"],
                   dependencies=[Depends(security)])


@router.get("/my", response_model=List[SettingDto])
async def get_settings_by_user_id(
        user_id: int = Depends(get_current_user_id),
        setting_service: SettingService = Depends(get_setting_service),
):
    return await setting_service.get_by_user_id(user_id)


@router.post("/my")
async def create_setting(
        setting_data: List[SettingDto],
        user_id: int = Depends(get_current_user_id),
        setting_service: SettingService = Depends(get_setting_service),
):
    await setting_service.update(user_id, setting_data)
    return JSONResponse(status_code=200,
                        content={"message": "Settings updated successfully"})
