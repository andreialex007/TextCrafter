from fastapi import APIRouter, Depends, HTTPException, status

from core.prompts.prompt_dto import PromptDto, CreatePromptDto, UpdatePromptDto
from core.prompts.prompt_service import get_prompt_service, PromptService

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.post("/", response_model=PromptDto, status_code=status.HTTP_201_CREATED)
async def create_prompt(
        prompt_data: CreatePromptDto,
        prompt_service: PromptService = Depends(get_prompt_service),
):
    return await prompt_service.add_prompt(prompt_data)


@router.put("/{prompt_id}", response_model=PromptDto)
async def update_prompt(
        prompt_id: int,
        prompt_data: UpdatePromptDto,
        prompt_service: PromptService = Depends(get_prompt_service),
):
    try:
        return await prompt_service.update_prompt(prompt_id, prompt_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Prompt with ID {prompt_id} not found",
        )


@router.delete("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt(
        prompt_id: int,
        prompt_service: PromptService = Depends(get_prompt_service),
):
    await prompt_service.delete_prompt(prompt_id)
