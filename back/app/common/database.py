from sqlalchemy import String, Column, Integer, Boolean, ForeignKey, Text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import asyncio

DATABASE_URL = "sqlite+aiosqlite:///./test.db"
engine = create_async_engine(DATABASE_URL, echo=True, future=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


Base = declarative_base()


class EntityBase(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, index=True)


class User(EntityBase):
    __tablename__ = "users"

    name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    settings = relationship("Setting", back_populates="user", cascade="all, delete-orphan")
    prompts = relationship("Prompt", back_populates="user", cascade="all, delete-orphan")


class Setting(EntityBase):
    __tablename__ = "settings"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(Text, nullable=False)

    user = relationship(User, back_populates="settings")


class Prompt(EntityBase):
    __tablename__ = "prompts"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    content = Column(Text, nullable=False)

    user = relationship("User", back_populates="prompts")
    category = relationship("Category", back_populates="prompts")


class Category(EntityBase):
    __tablename__ = "categories"

    name = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)

    prompts = relationship("Prompt", back_populates="category", cascade="all, delete-orphan")


asyncio.run(init_db())
