from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError

from core.auth.auth_utils import AuthUtils
from core.users.user_service import UserService, get_user_service

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/token")
async def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        user_service: UserService = Depends(get_user_service)
):
    user = await user_service.login(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    access_token = AuthUtils.create_access_token(data={"name": user.username, id: user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/user")
async def current_user(
        token: str = Depends(oauth2_scheme),
        user_service: UserService = Depends(get_user_service)
):
    user = user_service.get_current_user(token)
    return user
