from typing import Optional

from pydantic import BaseModel


class DtoBase(BaseModel):
    id: Optional[int] = None
