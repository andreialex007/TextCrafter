from common.database import Prompt
from core.prompts.prompt_dto import PromptDto


class PromptMapper:
    @staticmethod
    def to_prompt_dto(prompt: Prompt) -> PromptDto:
        return PromptDto(
            id=prompt.id,
            name=prompt.name,
            user_id=prompt.user_id,
            category_id=prompt.category_id,
            content=prompt.content,
        )
