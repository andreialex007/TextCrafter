from pydantic import BaseModel
from typing import List


class TextProcessingResult(BaseModel):
    possible_options: List[str]
