from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from core.auth.auth_utils import get_current_user_id
from core.auth.security import security
from core.users.user_dto import UserDto
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(security)]
)


class UpsertUserRequest(BaseModel):
    name: str
    email: str
    role: str
    password: Optional[str]


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
        user_id: int = Depends(get_current_user_id)
):
    user = await user_service.get_by_id(user_id)
    if not user.isAdmin:
        return None
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


@router.post("", response_model=UserDto)
async def create_user(
        body: UpsertUserRequest,
        user_service: UserService = Depends(get_user_service),
        current_user_id: int = Depends(get_current_user_id)
):
    current_user = await user_service.get_by_id(current_user_id)
    if not current_user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized")

    new_user = UserDto(
        name=body.name,
        role=body.role,
        email=body.email,
        password=body.password
    )

    created_user = await user_service.add_user(new_user)
    return created_user


@router.put("/{user_id}", response_model=UserDto)
async def update_user(
        user_id: int,
        body: UpsertUserRequest,
        user_service: UserService = Depends(get_user_service),
        current_user_id: int = Depends(get_current_user_id)
):
    current_user = await user_service.get_by_id(current_user_id)
    if not current_user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized")

    updated_user = UserDto(
        id=user_id,
        name=body.name,
        email=body.email,
        role=body.role
    )

    result = await user_service.update_user(updated_user)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    return result


@router.delete("/{user_id}")
async def delete_user(
        user_id: int,
        user_service: UserService = Depends(get_user_service),
        current_user_id: int = Depends(get_current_user_id)
):
    current_user = await user_service.get_by_id(current_user_id)
    if not current_user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized")

    success = await user_service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")

    return {"success": True}
