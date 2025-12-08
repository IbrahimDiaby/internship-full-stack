from pydantic import BaseModel, Field

class AuthResponse(BaseModel):
    id: str = Field("", description="Exercise name")
    email:  str = Field("", description="Exercise name")

    class Config:
        orm_mode = True
