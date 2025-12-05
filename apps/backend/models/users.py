from uuid import uuid4
from sqlalchemy import Column, String, Date
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    born = Column(Date)