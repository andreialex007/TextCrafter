from datetime import datetime, timezone, timedelta

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials
from jose import jwt

from core.auth.security import security

SECRET_KEY = "testKey"
ALGORITHM = "HS256"
EXPIRE_MINS = 30


class AuthUtils:
    @staticmethod
    def create_access_token(data: dict):
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_MINS)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    @staticmethod
    def decode(token: str):
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload


async def get_current_user_id(
        credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = AuthUtils.decode(token)
    return int(payload.get("id"))
