from passlib.context import CryptContext
from models.schemas import UserRequestSchema, UserResponseSchema, TokenSchema
from models.users import User
from models.database import get_db

class Hash:
    MAX_BCRYPT_LENGTH = 72
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_password(self, password: str) -> str:
        password_bytes = password.encode("utf-8")[:self.MAX_BCRYPT_LENGTH]
        return self.pwd_context.hash(password_bytes)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        password_bytes = plain_password.encode("utf-8")[:self.MAX_BCRYPT_LENGTH]
        return self.pwd_context.verify(password_bytes, hashed_password)