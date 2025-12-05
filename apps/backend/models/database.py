from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_PATH="sqlite:///./app.db"

Base = declarative_base()
engine = create_engine(DATABASE_PATH, echo=True, connect_args={"check_same_thread":False} )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_db():
    Base.metadata.create_all(bind=engine)

