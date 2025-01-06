from fastapi import FastAPI

from core.users import router as users_router

app = FastAPI()

# Register routers
app.include_router(users_router.router)

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI application!"}