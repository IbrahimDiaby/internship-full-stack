from pydantic import BaseModel

class UserResponse(BaseModel):
    id: str
    name: str

    class Config:
        orm_mode = True
