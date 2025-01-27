from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer, HTTPBearer, \
    HTTPAuthorizationCredentials
from jose import JWTError
from pydantic import BaseModel

from core.auth.auth_utils import AuthUtils
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

security = HTTPBearer()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/token")
async def login(
        login_data: LoginRequest,
        user_service: UserService = Depends(get_user_service)
):
    user = await user_service.login(login_data.username, login_data.password)
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    access_token = AuthUtils.create_access_token(
        data={"name": user.username, id: user.id})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/user")
async def current_user(
        token: HTTPAuthorizationCredentials = Depends(security),
        user_service: UserService = Depends(get_user_service)
):
    user = user_service.get_current_user(token)
    return user
