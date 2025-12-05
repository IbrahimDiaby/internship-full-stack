from pydantic import BaseModel

class UserSchema(BaseModel):
    id: str
    email: str
    password: str
    
class UserRequestSchema(BaseModel):
    email: str
    password: str
    
class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"