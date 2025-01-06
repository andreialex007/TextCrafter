from fastapi import APIRouter, Depends

from core.users.user_dto import UserDto
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/users/",
    tags=["users"]
)

@router.post("/", response_model=UserDto)
def get_user(user_id: int, user_service: UserService = Depends(get_user_service)):
    user = user_service.get_by_id(user_id)
    return user