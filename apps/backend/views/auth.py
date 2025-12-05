from pydantic import BaseModel

class AuthResponse(BaseModel):
    id: str
    email:  str

    class Config:
        orm_mode = True
