from common.models.dto_base import DtoBase


class PromptDto(DtoBase):
    content: str
    user_id: int
    category_id: int
