from common.models.entity_base import EntityBase


class PromptDto(EntityBase):
    content: str
    user_id: int
    category_id: int
