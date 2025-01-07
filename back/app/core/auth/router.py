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


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = AuthUtils.decode(token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=username)
    if user is None:
        raise credentials_exception
    return user


@router.post("/token")
async def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        user_service: UserService = Depends(get_user_service)
):
    user = user_service.login(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = AuthUtils.create_access_token(data={"name": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/user")
async def current_user(
        token: str = Depends(oauth2_scheme),
        user_service: UserService = Depends(get_user_service)
):
    payload = AuthUtils.decode(token)
    username: str = payload.get("name")
    user = user_service.get_by_name(username)
    return user
