from uuid import uuid4
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from models.database import Base
from datetime import datetime

class Users(Base):
    __tablename__ = "Users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    programs = relationship("Programs", back_populates="User")
