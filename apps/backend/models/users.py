from uuid import uuid4
from sqlalchemy import Column, String, Date
from models.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    email = Column(String, unique=True)
    password = Column(String)