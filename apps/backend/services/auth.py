from sqlalchemy.orm import Session
from models.users import User
from models.schemas import UserRequestSchema

# Get token Header
def get_token_header():
    return "GET TOKEN HEADER"

# Get Specific User : Me
def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

# Get all Users
def get_users(db: Session):
    return db.query(User).all()

# Login
def login(db: Session, user : UserRequestSchema):
    return db.query(User).filter(User.email == user.email and User.password == user.password).first()

# SignUp
def signup(db: Session, user: UserRequestSchema):
    return create(db, user)

# Insert New User : SignUP
def create(db: Session, new_user: UserRequestSchema):
    new_user = User(email=new_user.email, password=new_user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Delete an User
def destroy(db: Session, user_id : str) :
    db.query(User).filter(User.id == user_id).delete(synchronize_session=False)
    db.commit()
    return "done"

# Update an User : Update a specific user
def update(db:Session, user_id: str, update_user: UserRequestSchema):
    db.query(User).filter(User.id == user_id).update(update_user)
    db.commit()
    return "updated"

