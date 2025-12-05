from fastapi import APIRouter

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@auth_router.post("/signup", summary="Create a new User", description="Create a new user")
def signup(email:str, password:str):
    return NotImplementedError


@auth_router.post("/login", summary="Authenticate user and get JWT", description="Authenticate user and get JWT")
def login(email:str, password:str):
    return NotImplementedError


@auth_router.get("/me", summary="Get current user info (protected)", description="Get current user info (protected)",
    #dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},)
def me():
    return NotImplementedError

