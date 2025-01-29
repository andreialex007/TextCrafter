from typing import List

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from common.database import get_db, Category
from common.models.service_base import ServiceBase
from core.categories.category_dto import CategoryDto, CreateCategoryDto, \
    UpdateCategoryDto, CategoryWithPromptsDto
from core.categories.category_mapper import CategoryMapper
from core.prompts.prompt_dto import PromptDto


def get_category_service(db: Session = Depends(get_db)):
    return CategoryService(db)


class CategoryService(ServiceBase):
    async def get_by_id(self, id: int) -> CategoryDto:
        category = (
            (await self.db.execute(select(Category).filter(Category.id == id)))
            .scalar_one()
        )
        return CategoryMapper.to_category_dto(category)

    async def get_by_name(self, name: str) -> CategoryDto:
        category = (
            (await self.db.execute(select(Category).filter(Category.name == name)))
            .scalar_one()
        )
        return CategoryMapper.to_category_dto(category)

    async def get_all(self) -> List[CategoryWithPromptsDto]:
        result = await self.db.execute(
            select(Category)
            .options(joinedload(Category.prompts))
        )
        categories = result.unique().scalars().all()
        return [
            CategoryWithPromptsDto(
                id=category.id,
                name=category.name,
                description=category.description,
                prompts=[
                    PromptDto(
                        id=prompt.id,
                        name=prompt.name,
                        user_id=prompt.user_id,
                        category_id=prompt.category_id,
                        content=prompt.content,
                    )
                    for prompt in category.prompts
                ],
            )
            for category in categories
        ]

    async def add_category(self, category_data: CreateCategoryDto) -> CategoryDto:
        new_category = Category(
            name=category_data.name,
            description=category_data.description,
        )
        self.db.add(new_category)
        await self.db.commit()
        await self.db.refresh(new_category)
        return CategoryMapper.to_category_dto(new_category)

    async def update_category(
            self, id: int, category_data: UpdateCategoryDto
    ) -> CategoryDto:
        category = (
            (await self.db.execute(select(Category).filter(Category.id == id)))
            .scalar_one()
        )
        category.name = category_data.name
        category.description = category_data.description
        await self.db.commit()
        await self.db.refresh(category)
        return CategoryMapper.to_category_dto(category)

    async def delete_category(self, id: int) -> None:
        category = (
            (await self.db.execute(select(Category).filter(Category.id == id)))
            .scalar_one()
        )
        await self.db.delete(category)
        await self.db.commit()
