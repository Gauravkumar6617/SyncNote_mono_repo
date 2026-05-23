from sqlalchemy.orm import Session
from app.model.userModel import User
from app.schema.userSchema import UserCreate
from typing import Optional
from app.core.security import hash_password


class AuthRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user_create: UserCreate, password_hash: Optional[str] = None, provider_id: Optional[str] = None, auth_provider: str = "LOCAL") -> User:
        final_hash = None
        if password_hash:
            final_hash = password_hash
        elif hasattr(user_create, "password") and user_create.password:
            final_hash = hash_password(user_create.password)

        new_user = User(
            email=user_create.email,
            username=user_create.username,
            fullname=user_create.fullname,
            bio=user_create.bio,
            profile_picture=user_create.avatar,
            password_hash=final_hash,
            auth_provider=auth_provider,
            provider_id=provider_id,
            is_active=True,
            is_verified=False
        )

        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user
       
       
       
