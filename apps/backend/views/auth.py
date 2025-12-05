from pydantic import BaseModel

class AuthResponse(BaseModel):
    id: int
    email:  str

    class Config:
        orm_mode = True
