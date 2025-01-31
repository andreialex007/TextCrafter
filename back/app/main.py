import asyncio
import traceback

import uvicorn
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError, HTTPException
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from common.database import AsyncSessionLocal
from core.auth import auth_router

from core.categories.category_dto import CreateCategoryDto
from core.categories.category_service import CategoryService
from core.prompts.prompt_dto import CreatePromptDto
from core.prompts.prompt_service import PromptService
from core.settings import setting_router as settings_router
from core.users import user_router as users_router
from core.categories import category_router as categories_router
from core.prompts import prompt_router as prompts_router
from core.assistant import assistant_router as assistant_router
from core.users.user_dto import CreateUserDto
from core.users.user_service import UserService
from migrations.run import run_app_migrations


async def before_run():
    run_app_migrations()
    async with AsyncSessionLocal() as db:
        user_service = UserService(db)
        category_service = CategoryService(db)
        prompt_service = PromptService(db)
        admins = await user_service.get_users_by_role("admin")
        if len(admins) == 0:
            user_dto = CreateUserDto(name="admin", email="admin@admin.com", role="admin",
                                     password="1")
            user_dto = await user_service.add_user(user_dto)
        admins = await user_service.get_users_by_role("admin")
        if len((await category_service.get_all())) == 0:
            new_category = await category_service.add(CreateCategoryDto(
                name="category1", description="description1"
            ))
            await prompt_service.add_prompt(
                CreatePromptDto(
                    name="first prompt",
                    user_id=admins[0].id,
                    content="content1",
                    category_id=new_category.id
                ))

        first_admin = admins[0]


app = FastAPI()


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Log exception details
    print(f"Unhandled exception occurred for URL {request.url}:")
    print(traceback.format_exc())  # Logs the full exception traceback

    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please contact support.",
            "exception_type": type(exc).__name__,
            # Type of exception (e.g., KeyError, ValueError)
            "error_message": str(exc),  # The string representation of the error
            "request": {
                "url": str(request.url),
                "method": request.method,
            },
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print("Validation Error Occurred:")
    print(traceback.format_exc())

    return JSONResponse(
        status_code=422,
        content={
            "detail": exc.errors(),
            "body": exc.body,
            "url": str(request.url),
            "method": request.method
        },
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router.router)
app.include_router(auth_router.router)
app.include_router(assistant_router.router)
app.include_router(categories_router.router)
app.include_router(prompts_router.router)
app.include_router(settings_router.router)


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
