from uuid import uuid4
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from models.database import Base
from datetime import datetime, UTC

class Programs(Base):
    __tablename__ = "programs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    prompt = Column(String, nullable=False)
    output = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(UTC))

    users = relationship("Users", back_populates="programs")
