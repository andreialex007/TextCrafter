from typing import Optional

from common.models.dto_base import DtoBase


class PromptDto(DtoBase):
    name: str
    user_id: int
    category_id: Optional[int]
    content: str


class CreatePromptDto(DtoBase):
    name: str
    user_id: int
    category_id: Optional[int]
    content: str


class UpdatePromptDto(DtoBase):
    name: Optional[str]
    category_id: Optional[int]
    content: Optional[str]


class PromptInListDto(DtoBase):
    content: str

    # Access CategoryDto lazily
    @property
    def category(self):
        from core.categories.category_dto import CategoryDto  # Lazy import
        return CategoryDto
