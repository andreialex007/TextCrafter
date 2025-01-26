from typing import List

from fastapi import APIRouter, Depends, status

from core.categories.category_dto import (
    CategoryWithPromptsDto,
    CreateCategoryDto,
    UpdateCategoryDto,
)
from core.categories.category_service import get_category_service, CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=List[CategoryWithPromptsDto])
async def get_all_categories(
        category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.get_all_categories()


@router.post("/", response_model=CategoryWithPromptsDto,
             status_code=status.HTTP_201_CREATED)
async def create_category(
        category_data: CreateCategoryDto,
        category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.add_category(category_data)


@router.put("/{category_id}", response_model=CategoryWithPromptsDto)
async def update_category(
        category_id: int,
        category_data: UpdateCategoryDto,
        category_service: CategoryService = Depends(get_category_service),
):
    return await category_service.update_category(category_id, category_data)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
        category_id: int,
        category_service: CategoryService = Depends(get_category_service),
):
    await category_service.delete_category(category_id)
