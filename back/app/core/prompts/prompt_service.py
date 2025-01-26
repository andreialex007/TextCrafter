from typing import List, Optional
from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from common.database import get_db, Prompt, User, Category
from common.models.service_base import ServiceBase
from core.prompts.prompt_dto import PromptDto, CreatePromptDto, UpdatePromptDto


def get_prompt_service(db: Session = Depends(get_db)):
    return PromptService(db)


class PromptService(ServiceBase):
    async def get_by_id(self, id: int) -> PromptDto:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.id == id)))
            .scalar_one()
        )
        return PromptDto(
            id=prompt.id,
            name=prompt.name,
            user_id=prompt.user_id,
            category_id=prompt.category_id,
            content=prompt.content,
        )

    async def get_by_name(self, name: str) -> PromptDto:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.name == name)))
            .scalar_one()
        )
        return PromptDto(
            id=prompt.id,
            name=prompt.name,
            user_id=prompt.user_id,
            category_id=prompt.category_id,
            content=prompt.content,
        )

    async def get_prompts_by_user(self, user_id: int) -> List[PromptDto]:
        result = await self.db.execute(select(Prompt).filter(Prompt.user_id == user_id))
        prompts = result.scalars().all()
        return [
            PromptDto(
                id=prompt.id,
                name=prompt.name,
                user_id=prompt.user_id,
                category_id=prompt.category_id,
                content=prompt.content,
            )
            for prompt in prompts
        ]

    async def get_prompts_by_category(self, category_id: int) -> List[PromptDto]:
        result = await self.db.execute(
            select(Prompt).filter(Prompt.category_id == category_id)
        )
        prompts = result.scalars().all()
        return [
            PromptDto(
                id=prompt.id,
                name=prompt.name,
                user_id=prompt.user_id,
                category_id=prompt.category_id,
                content=prompt.content,
            )
            for prompt in prompts
        ]

    async def add_prompt(self, prompt_data: CreatePromptDto) -> PromptDto:
        new_prompt = Prompt(
            name=prompt_data.name,
            user_id=prompt_data.user_id,
            category_id=prompt_data.category_id,
            content=prompt_data.content,
        )
        self.db.add(new_prompt)
        await self.db.commit()
        await self.db.refresh(new_prompt)
        return PromptDto(
            id=new_prompt.id,
            name=new_prompt.name,
            user_id=new_prompt.user_id,
            category_id=new_prompt.category_id,
            content=new_prompt.content,
        )

    async def update_prompt(self, id: int, prompt_data: UpdatePromptDto) -> PromptDto:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.id == id)))
            .scalar_one()
        )
        if prompt_data.name:
            prompt.name = prompt_data.name
        if prompt_data.category_id:
            prompt.category_id = prompt_data.category_id
        if prompt_data.content:
            prompt.content = prompt_data.content
        await self.db.commit()
        await self.db.refresh(prompt)
        return PromptDto(
            id=prompt.id,
            name=prompt.name,
            user_id=prompt.user_id,
            category_id=prompt.category_id,
            content=prompt.content,
        )

    async def delete_prompt(self, id: int) -> None:
        prompt = (
            (await self.db.execute(select(Prompt).filter(Prompt.id == id)))
            .scalar_one()
        )
        await self.db.delete(prompt)
        await self.db.commit()
