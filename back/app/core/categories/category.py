from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship

from common.models.entity_base import EntityBase


class Category(EntityBase):
    __tablename__ = "categories"

    name = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)

    prompts = relationship("Prompt", back_populates="category", cascade="all, delete-orphan")