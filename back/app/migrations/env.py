import asyncio
import sys
from pathlib import Path

from alembic import context, command
from alembic.config import Config
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import create_async_engine

sys.path.append("..")

from common.database import DATABASE_URL, Base

engine = create_async_engine(DATABASE_URL, poolclass=pool.NullPool)

target_metadata = Base.metadata


async def run_migrations():
    """Run migrations asynchronously."""
    async with engine.begin() as conn:
        await conn.run_sync(do_run_migrations)


def do_run_migrations(connection: Connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def main():
    """Main migration entry point."""
    async with engine.begin() as conn:
        await conn.run_sync(do_run_migrations)

if context.is_offline_mode():
    context.configure(url=DATABASE_URL, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()
else:
    asyncio.run(main())

