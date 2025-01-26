from typing import Optional, List

from common.models.dto_base import DtoBase
from core.prompts.prompt_dto import PromptDto


class CategoryDto(DtoBase):
    id: int
    name: str
    description: Optional[str]


class CreateCategoryDto(DtoBase):
    name: str
    description: Optional[str]


class UpdateCategoryDto(DtoBase):
    name: Optional[str]
    description: Optional[str]


class CategoryWithPromptsDto(DtoBase):
    name: str
    description: Optional[str]
    prompts: List[PromptDto]
