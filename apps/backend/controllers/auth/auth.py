from fastapi import APIRouter, Depends

from models.database import SessionLocal
from models.schemas import UserRequestSchema
from services.auth import create, login, get_token_header

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@auth_router.post("/signup", summary="Create a new User", description="Create a new user")
def signup(email:str, password:str):
    request = UserRequestSchema(email=email, password=password)
    new_user = create(db=SessionLocal, new_user=request)
    return new_user

@auth_router.post("/login", summary="Authenticate user and get JWT", description="Authenticate user and get JWT")
def login(email:str, password:str):
    request = UserRequestSchema(email=email, password=password)
    user = login(db=SessionLocal, user=request)
    return user


@auth_router.get("/me", summary="Get current user info (protected)", description="Get current user info (protected)",
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},)
def me():
    return get_token_header()

