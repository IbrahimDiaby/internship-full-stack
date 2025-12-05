from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from apps.backend.models.database import get_db
from apps.backend.services.users import get_user
from apps.backend.views.users import UserResponse

router = APIRouter(prefix="/users")

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    return user
