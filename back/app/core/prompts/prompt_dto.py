from common.models.dto_base import DtoBase
from core.categories.category_dto import CategoryDto


class PromptDto(DtoBase):
    content: str
    user_id: int
    category_id: int


class PromptInListDto(DtoBase):
    content: str
    category: CategoryDto
