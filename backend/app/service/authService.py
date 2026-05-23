from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.model.userModel import User
from app.repositories.authRespositories import AuthRepository
from app.schema.userSchema import UserCreate


class AuthService:

    def __init__(self, db: Session):
        self.repo = AuthRepository(db)

    def create_user(
        self,
        user_create: UserCreate,
        provider_id: Optional[str] = None,
        auth_provider: str = "LOCAL"
    ) -> User:

        # Check existing email or username
        existing_user = self.repo.db.query(User).filter(
            (User.email == user_create.email) |
            (User.username == user_create.username)
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or username already exists"
            )

        # Local authentication
        if auth_provider == "LOCAL":

            if not user_create.password:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Password is required for local registration"
                )

            return self.repo.create_user(
                user_create=user_create,
                auth_provider="LOCAL"
            )

        # OAuth validation
        if not provider_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Provider ID is required for social registration"
            )

        # Check existing social account
        check_provider_id = self.repo.db.query(User).filter(
            User.provider_id == provider_id,
            User.auth_provider == auth_provider
        ).first()

        if check_provider_id:
            return check_provider_id

        return self.repo.create_user(
            user_create=user_create,
            provider_id=provider_id,
            auth_provider=auth_provider
        )