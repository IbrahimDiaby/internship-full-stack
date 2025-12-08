from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from models.schemas import UserRequestSchema, UserResponseSchema, TokenSchema
from models.users import Users
from models.database import get_db
from models.hash import Hash
from models.token import Token

TOKEN = Token()
HASH = Hash()

def create_user(db: Session, new_user: UserRequestSchema) -> UserResponseSchema:
    existing_user = db.query(Users).filter(Users.email == new_user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = HASH.hash_password(new_user.password)
    db_user = Users(email=new_user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return UserResponseSchema(id=db_user.id, email=db_user.email, created_at=db_user.created_at)

def authenticate_user(db: Session, user: UserRequestSchema) -> TokenSchema:
    db_user = db.query(Users).filter(Users.email == user.email).first()
    if not db_user or not HASH.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = TOKEN.create_access_token({"sub": db_user.email, "user_id": db_user.id})
    return TokenSchema(access_token=access_token, token_type="bearer")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(TOKEN.security), db: Session = Depends(get_db)) -> UserResponseSchema:
    token = credentials.credentials
    payload = TOKEN.decode_token(token)
    email = payload.get("sub")
    user_id = payload.get("user_id")
    if not email or not user_id:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    db_user = db.query(Users).filter(Users.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Users not found")
    return UserResponseSchema(id=db_user.id, email=db_user.email, created_at=db_user.created_at)

