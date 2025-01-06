from common.models.dto_base import DtoBase
from common.models.entity_base import EntityBase


class UserDto(DtoBase):
    id: int
    name: str


