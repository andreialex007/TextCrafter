from typing import List, cast

from fastapi import Depends
from functional import seq
from sqlalchemy import select, func
from sqlalchemy.orm import Session, joinedload

from common.database import get_db, Category, Prompt
from common.models.service_base import ServiceBase
from core.categories.category_dto import CategoryDto, CreateCategoryDto, \
    UpdateCategoryDto, CategoryWithPromptsDto, TotalStatistics
from core.categories.category_mapper import CategoryMapper
from core.prompts.prompt_mapper import PromptMapper


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
            .order_by(Category.name)
        )
        categories = result.unique().scalars().all()
        return [
            CategoryWithPromptsDto(
                id=category.id,
                name=category.name,
                description=category.description,
                prompts=(seq(category.prompts)
                         .order_by(lambda p: cast(Prompt, p).name)
                         .select(lambda el: PromptMapper.to_prompt_dto(el))
                         .to_list()),
            )
            for category in categories
        ]

    async def add(self, category_data: CreateCategoryDto,
                  user_id: int) -> CategoryDto:
        new_category = Category(
            name=category_data.name,
            description=category_data.description,
            user_id=user_id
        )
        self.db.add(new_category)
        await self.db.commit()
        await self.db.refresh(new_category)
        return CategoryMapper.to_category_dto(new_category)

    async def update(
            self, category_data: UpdateCategoryDto, user_id: int
    ) -> CategoryDto:
        category = (
            (await self.db.execute(
                select(Category).filter(Category.id == category_data.id)))
            .scalar_one()
        )
        category.name = category_data.name
        category.description = category_data.description
        category.user_id = user_id
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

    async def get_statistics(self) -> TotalStatistics:
        total_categories = ((await self.db.execute(select(func.count(Category.id))))
                            .scalar_one())
        total_prompts = ((
                             await self.db.execute(select(func.count(Prompt.id))))
                         .scalar_one())
        return TotalStatistics(categories=total_categories, prompts=total_prompts)
