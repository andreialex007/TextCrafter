from typing import Optional

from fastapi import APIRouter, Depends
from fastapi.params import Query

from core.auth.security import security
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


@router.get("/users/search")
async def search_users(
        name: Optional[str] = Query(None),
        role: Optional[str] = Query(None),
        email: Optional[str] = Query(None),
        take: int = Query(10),
        skip: int = Query(0),
        user_service: UserService = Depends(get_user_service),
):
    filters = {"name": name, "role": role, "email": email}
    users, total_non_filtered, total_filtered = await user_service.search_users(filters,
                                                                                take,
                                                                                skip)
    return {
        "users": users,
        "total_non_filtered": total_non_filtered,
        "total_filtered": total_filtered,
    }
