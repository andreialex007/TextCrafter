from sqlalchemy import Text, Column, String, Boolean
from sqlalchemy.orm import relationship

from common.models.entity_base import EntityBase

class User(EntityBase):
    name = Column(String, unique=True, nullable=False)
    email  = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    settings = relationship("Setting", back_populates="user", cascade="all, delete-orphan")
    prompts = relationship("Prompt", back_populates="user", cascade="all, delete-orphan")
