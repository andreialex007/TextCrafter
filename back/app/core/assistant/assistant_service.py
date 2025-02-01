from fastapi import Depends
from sqlalchemy.orm import Session

from common.ai.ai_chat import AiChat
from common.database import get_db
from common.models.service_base import ServiceBase
from core.categories.category_dto import CategoryDto
from core.prompts.prompt_service import PromptService, get_prompt_service


def get_assistant_service(
        db: Session = Depends(get_db),
        prompt_service: PromptService = Depends(get_prompt_service)
):
    return AssistantService(db, prompt_service)


class AssistantService(ServiceBase):
    def __init__(self, db: Session, prompt_service: PromptService):
        super().__init__(db)
        self.prompt_service = prompt_service
        pass

    async def get_suggestions(self, text: str, promptId: int) -> CategoryDto:
        prompt = await self.prompt_service.get_by_id(promptId)
        suggestions = AiChat.get_suggestions(text, prompt.content)
        return suggestions.possible_options
