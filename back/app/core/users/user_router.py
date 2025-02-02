from typing import Optional

from fastapi import APIRouter, Depends
from fastapi.params import Query
from pydantic import BaseModel

from core.auth.security import security
from core.users.user_dto import UserDto
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(security)]
)


class SearchUserRequest(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    id: Optional[int] = None
    take: int = 10
    skip: int = 0


@router.get("/{user_id}", response_model=UserDto)
async def get_user(
        user_id: int,
        user_service: UserService = Depends(get_user_service)):
    user = await user_service.get_by_id(user_id)
    return user


@router.post("/search")
async def search_users(
        body: SearchUserRequest,
        user_service: UserService = Depends(get_user_service),
):
    filters = {"id": body.id, "name": body.name, "role": body.role, "email": body.email}
    users, total_non_filtered, total_filtered = await user_service.search_users(
        filters,
        body.take,
        body.skip
    )
    return {
        "items": users,
        "total": total_non_filtered,
        "filtered": total_filtered,
    }
