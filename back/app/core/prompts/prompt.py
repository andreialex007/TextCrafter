from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from common.models.entity_base import EntityBase

class Prompt(EntityBase):
    __tablename__ = "prompts"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    content = Column(Text, nullable=False)

    user = relationship("User", back_populates="prompts")
    category = relationship("Category", back_populates="prompts")