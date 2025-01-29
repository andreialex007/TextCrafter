from typing import Optional, List

from common.models.dto_base import DtoBase
from core.prompts.prompt_dto import PromptDto


class CategoryDto(DtoBase):
    id: int
    name: str
    description: Optional[str] = None


class CreateCategoryDto(DtoBase):
    name: str
    description: Optional[str] = None


class UpdateCategoryDto(DtoBase):
    name: Optional[str] = None
    description: Optional[str] = None


class CategoryWithPromptsDto(DtoBase):
    name: str
    description: Optional[str] = None
    prompts: List[PromptDto]
