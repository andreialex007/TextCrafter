from fastapi import APIRouter, Depends

from core.auth.router import security
from core.users.user_dto import UserDto
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(security)]
)


@router.get("/{user_id}", response_model=UserDto)
async def get_user(
        user_id: int,
        user_service: UserService = Depends(get_user_service)):
    user = await user_service.get_by_id(user_id)
    return user
