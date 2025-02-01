from typing import List

from fastapi import APIRouter, Depends, status
from plotly.graph_objs.waterfall import Totals

from core.auth.auth_utils import get_current_user_id
from core.auth.security import security
from core.categories.category_dto import (
    CategoryWithPromptsDto,
    CreateCategoryDto,
    UpdateCategoryDto, CategoryDto, TotalStatistics,
)
from core.categories.category_service import get_category_service, CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
    dependencies=[Depends(security)])


@router.get("/stat", response_model=TotalStatistics)
async def get_stat(
        category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.get_statistics()


@router.get("/", response_model=List[CategoryWithPromptsDto])
async def get_all_categories(
        category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.get_all()


@router.post("/", response_model=CategoryDto, status_code=status.HTTP_201_CREATED)
async def create_category(
        category_data: CreateCategoryDto,
        category_service: CategoryService = Depends(get_category_service),
        user_id: int = Depends(get_current_user_id)
):
    return await category_service.add(category_data, user_id)


@router.put("/{category_id}", response_model=CategoryDto)
async def update_category(
        category_id: int,
        category_data: UpdateCategoryDto,
        category_service: CategoryService = Depends(get_category_service),
        user_id: int = Depends(get_current_user_id)
):
    category_data.id = category_id
    return await category_service.update(category_data, user_id)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
        category_id: int,
        category_service: CategoryService = Depends(get_category_service),
):
    await category_service.delete_category(category_id)
