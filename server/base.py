from pydantic import BaseModel


class PridictModel(BaseModel):
    corrdinate_offet: list[list[int]]
    board_width: int
    board_height: int
