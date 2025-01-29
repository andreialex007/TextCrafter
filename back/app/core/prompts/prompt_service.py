from typing import List, Optional
from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from common.database import get_db, Prompt, User, Category
from common.models.service_base import ServiceBase
from core.prompts.prompt_dto import PromptDto, CreatePromptDto, UpdatePromptDto
from core.prompts.prompt_mapper import PromptMapper


def get_prompt_service(db: Session = Depends(get_db)):
    return PromptService(db)


class PromptService(ServiceBase):
    async def get_by_id(self, id: int) -> PromptDto:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.id == id)))
            .scalar_one()
        )
        return PromptMapper.to_prompt_dto(prompt)

    async def get_by_name(self, name: str) -> PromptDto:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.name == name)))
            .scalar_one()
        )
        return PromptMapper.to_prompt_dto(prompt)

    async def get_prompts_by_user(self, user_id: int) -> List[PromptDto]:
        result = await self.db.execute(select(Prompt).filter(Prompt.user_id == user_id))
        prompts = result.scalars().all()
        return [PromptMapper.to_prompt_dto(prompt) for prompt in prompts]

    async def get_prompts_by_category(self, category_id: int) -> List[PromptDto]:
        result = await self.db.execute(
            select(Prompt).filter(Prompt.category_id == category_id)
        )
        prompts = result.scalars().all()
        return [PromptMapper.to_prompt_dto(prompt) for prompt in prompts]

    async def add_prompt(self, prompt_data: CreatePromptDto, user_id: int) -> PromptDto:
        new_prompt = Prompt(
            name=prompt_data.name,
            user_id=user_id,
            category_id=prompt_data.category_id,
            content=prompt_data.content,
        )
        self.db.add(new_prompt)
        await self.db.commit()
        await self.db.refresh(new_prompt)
        return PromptMapper.to_prompt_dto(new_prompt)

    async def update_prompt(self, id: int,
                            prompt_data: UpdatePromptDto,
                            user_id: int) -> PromptDto:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.id == id)))
            .scalar_one()
        )
        prompt.name = prompt_data.name
        prompt.category_id = prompt_data.category_id
        prompt.content = prompt_data.content
        prompt.user_id = user_id
        await self.db.commit()
        await self.db.refresh(prompt)
        return PromptMapper.to_prompt_dto(prompt_data)

    async def delete_prompt(self, id: int) -> None:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.id == id)))
            .scalar_one()
        )
        await self.db.delete(prompt)
        await self.db.commit()
