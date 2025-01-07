import uvicorn
from fastapi import FastAPI
import uvicorn

from core.users import router as users_router

app = FastAPI()

app.include_router(users_router.router)


@app.get("/")
def root():
    router = app.router
    return {"message": "Welcome to the FastAPI application TEST!"}


# enable "Emulate terminal in output console"
if __name__ == "__main__":
    uvicorn.run("main:app",
                host="127.0.0.1",
                port=8055,
                reload=True,
                reload_includes=["*.py"])
