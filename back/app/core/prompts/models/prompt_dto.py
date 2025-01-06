from typing import Optional

from pydantic import BaseModel

# Prompt Schemas (One-to-Many Relationship)
class PromptDto(BaseModel):
    id: int
    content: str
    category_id: Optional[int] = None
