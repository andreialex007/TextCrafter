from datetime import datetime, timezone, timedelta
from jose import jwt

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
