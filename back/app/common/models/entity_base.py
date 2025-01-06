from sqlalchemy import Integer, Column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class EntityBase(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, index=True)