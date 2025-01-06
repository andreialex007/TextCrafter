from pydantic import BaseModel


class DtoBase(BaseModel):
    id: int