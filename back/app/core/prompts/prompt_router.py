from fastapi import APIRouter, Depends, HTTPException, status

from core.auth.auth_utils import get_current_user_id
from core.auth.security import security
from core.prompts.prompt_dto import PromptDto, CreatePromptDto, UpdatePromptDto
from core.prompts.prompt_service import get_prompt_service, PromptService

router = APIRouter(
    prefix="/prompts",
    tags=["prompts"],
    dependencies=[Depends(security)])


@router.post("/", response_model=PromptDto, status_code=status.HTTP_201_CREATED)
async def create_prompt(
        prompt_data: CreatePromptDto,
        prompt_service: PromptService = Depends(get_prompt_service),
        user_id: str = Depends(get_current_user_id),
):
    return await prompt_service.add_prompt(prompt_data, user_id)


@router.put("/{prompt_id}", response_model=PromptDto)
async def update_prompt(
        prompt_id: int,
        prompt_data: UpdatePromptDto,
        prompt_service: PromptService = Depends(get_prompt_service),
        user_id: int = Depends(get_current_user_id)
):
    return await prompt_service.update_prompt(prompt_id, prompt_data, user_id)


@router.delete("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt(
        prompt_id: int,
        prompt_service: PromptService = Depends(get_prompt_service),
):
    await prompt_service.delete_prompt(prompt_id)
