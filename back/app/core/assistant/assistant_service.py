import os

from fastapi import Depends
from sqlalchemy.orm import Session

from common.ai.ai_chat import AiChat
from common.database import get_db
from common.models.service_base import ServiceBase
from core.categories.category_dto import CategoryDto
from core.prompts.prompt_service import PromptService, get_prompt_service
from core.settings.setting_dto import UserSettings
from core.settings.setting_service import SettingService, get_setting_service


def get_assistant_service(
        db: Session = Depends(get_db),
        prompt_service: PromptService = Depends(get_prompt_service),
        setting_service: SettingService = Depends(get_setting_service)
):
    return AssistantService(db, prompt_service, setting_service)


class AssistantService(ServiceBase):
    def __init__(self, db: Session, prompt_service: PromptService,
                 setting_service: SettingService):
        super().__init__(db)
        self.prompt_service = prompt_service
        self.setting_service = setting_service
        pass

    async def get_suggestions(self, text: str, prompt_id: int,
                              user_id: int) -> CategoryDto:
        prompt = await self.prompt_service.get_by_id(prompt_id)
        common_text = await self.setting_service.get_by_name_and_id(
            UserSettings.COMMON_SUGGESTION.name,
            user_id)
        key_option = await self.setting_service.get_by_name_and_id(
            UserSettings.AI_API_KEY.name,
            user_id)
        options_opt = await self.setting_service.get_by_name_and_id(
            UserSettings.OPTIONS_NUMBER.name,
            user_id)
        key_value = key_option.value
        if key_value.startswith("{") and key_value.endswith("}"):
            stripped_key = key_value.lstrip("{").rstrip("}")
            key_value = os.getenv(stripped_key)
        suggestions = AiChat.get_suggestions(common_text.value + " " + text,
                                             prompt.content,
                                             key_value,
                                             int(options_opt.value))
        return suggestions.possible_options
