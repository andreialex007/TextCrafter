from sqlalchemy import Column, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship

from common.models.entity_base import EntityBase


class Setting(EntityBase):
    __tablename__ = "settings"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(Text, nullable=False)

    user = relationship("User", back_populates="settings")

