from typing import Optional, List

from common.models.dto_base import DtoIdBase, DtoBase
from core.prompts.prompt_dto import PromptDto


class CategoryDto(DtoIdBase):
    id: int
    name: str
    description: Optional[str] = None


class CreateCategoryDto(DtoIdBase):
    name: str
    description: Optional[str] = None


class UpdateCategoryDto(DtoIdBase):
    name: Optional[str] = None
    description: Optional[str] = None


class CategoryWithPromptsDto(DtoIdBase):
    name: str
    description: Optional[str] = None
    prompts: List[PromptDto]


class TotalStatistics(DtoBase):
    categories: int
    prompts: int
