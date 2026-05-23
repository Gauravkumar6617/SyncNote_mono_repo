from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from app.model.userModel import AuthProvider

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    # provider: AuthProvider

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)
    fullname: str = Field(..., min_length=3, max_length=50)
    bio: Optional[str] = None
    avatar: Optional[str] = None
    oAuth_provider: AuthProvider = AuthProvider.LOCAL
    oAuth_provider_id: Optional[str] = None

class UserLogin(BaseModel):
    identifier: str # can be email or username
    password: str
    oAuth_provider: AuthProvider = AuthProvider.LOCAL