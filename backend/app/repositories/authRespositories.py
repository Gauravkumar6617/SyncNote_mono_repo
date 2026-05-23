"""
Authentication Repository

Handles all database operations related to user authentication and management.
"""

from typing import Optional

from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.model.userModel import User
from app.schema.userSchema import UserCreate


class AuthRepository:
    """Repository class for authentication-related database operations."""

    def __init__(self, db: Session):
        """
        Initialize the AuthRepository with a database session.

        Args:
            db (Session): SQLAlchemy database session
        """
        self.db = db

    def create_user(
        self,
        user_create: UserCreate,
        password_hash: Optional[str] = None,
        provider_id: Optional[str] = None,
        auth_provider: str = "LOCAL"
    ) -> User:
        """
        Create a new user in the database.

        Args:
            user_create (UserCreate): User creation schema with basic information
            password_hash (Optional[str]): Pre-hashed password (if provided)
            provider_id (Optional[str]): OAuth provider ID (if using social login)
            auth_provider (str): Authentication provider type (default: "LOCAL")

        Returns:
            User: The newly created user object

        Raises:
            SQLAlchemy exceptions: If database operation fails
        """
        # Determine the password hash to use
        final_hash = None
        if password_hash:
            final_hash = password_hash
        elif hasattr(user_create, "password") and user_create.password:
            # Hash the password if provided in user_create schema
            final_hash = hash_password(user_create.password)

        # Create new user instance
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

        # Persist to database
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)

        return new_user
       
       
       
