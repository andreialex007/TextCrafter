from typing import Optional

from common.models.dto_base import DtoIdBase


class PromptDto(DtoIdBase):
    name: str
    category_id: Optional[int] = None
    user_id: Optional[int] = None
    content: str


class CreatePromptDto(DtoIdBase):
    name: str
    category_id: int
    content: str


class UpdatePromptDto(DtoIdBase):
    name: Optional[str] = None
    category_id: Optional[int] = None
    content: Optional[str] = None
    user_id: Optional[int] = None


class PromptInListDto(DtoIdBase):
    content: str

    @property
    def category(self):
        from core.categories.category_dto import CategoryDto
        return CategoryDto
