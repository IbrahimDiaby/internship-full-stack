from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
