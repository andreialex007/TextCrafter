from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from core.auth.auth_utils import AuthUtils, EXPIRE_MINS
from core.auth.security import security
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/token")
async def login(
        login_data: LoginRequest,
        response: Response,
        user_service: UserService = Depends(get_user_service)
):
    user = await user_service.login(login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    access_token = AuthUtils.create_access_token(
        data={"name": user.name, "id": user.id}
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=EXPIRE_MINS * 60
    )

    return {"token": access_token, "type": "bearer"}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"detail": "Successfully logged out"}


@router.get("/user")
async def current_user(
        token: HTTPAuthorizationCredentials = Depends(security),
        user_service: UserService = Depends(get_user_service)
):
    user = user_service.get_current_user(token)
    return user
