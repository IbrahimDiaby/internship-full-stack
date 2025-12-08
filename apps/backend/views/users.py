from pydantic import BaseModel, Field

class UserResponse(BaseModel):
    id: str= Field("", description="User ID")
    name: str= Field("", description="User Name")

    class Config:
        orm_mode = True
