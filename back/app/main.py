import asyncio
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
import asyncio

from common.database import AsyncSessionLocal, get_db
from core.auth import router as auth_router
from core.users import router as users_router
from core.users.user_dto import CreateUserDto
from core.users.user_service import UserService
from migrations.run import run_app_migrations


async def before_run():
    run_app_migrations()
    async with AsyncSessionLocal() as db:
        service = UserService(db)
        admins = await service.get_users_by_role("admin")
        if len(admins) == 0:
            dto = CreateUserDto(name="admin", email="admin@admin.com", role="admin",
                                password="1")
            await service.add_user(dto)
        admins = await service.get_users_by_role("admin")
        first_admin = admins[0]


app = FastAPI()

app.include_router(users_router.router)
app.include_router(auth_router.router)


@app.get("/")
def root():
    return {"message": "Working!!!"}


if __name__ == "__main__":
    asyncio.run(before_run())
    uvicorn.run("main:app",
                host="127.0.0.1",
                port=8055,
                reload=True,
                reload_includes=["*.py"])
