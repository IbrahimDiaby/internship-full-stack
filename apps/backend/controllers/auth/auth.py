from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from models.database import get_db
from models.schemas import UserRequestSchema, UserResponseSchema, TokenSchema
from services.auth import create_user, authenticate_user, get_current_user

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/signup", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
def signup(request: UserRequestSchema, db: Session = Depends(get_db)):
    return create_user(db=db, new_user=request)

@auth_router.post("/login", response_model=TokenSchema)
def login(request: UserRequestSchema, db: Session = Depends(get_db)):
    return authenticate_user(db=db, user=request)

@auth_router.get("/me", response_model=UserResponseSchema)
def me(current_user: UserResponseSchema = Depends(get_current_user)):
    return current_user
