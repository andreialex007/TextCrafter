from typing import List

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel

from core.assistant.assistant_service import AssistantService, get_assistant_service
from core.auth.auth_utils import get_current_user_id

router = APIRouter(
    prefix="/assistant",
    tags=["assistant"]
)


class OptionsRequestBody(BaseModel):
    text: str
    promptId: int


@router.post("/options", response_model=List[str])
async def options(
        request_body: OptionsRequestBody,
        assistant_service: AssistantService = Depends(get_assistant_service),
        user_id: int = Depends(get_current_user_id)
):
    text = request_body.text
    promptId = request_body.promptId
    suggestions = await assistant_service.get_suggestions(text, promptId)
    return suggestions
