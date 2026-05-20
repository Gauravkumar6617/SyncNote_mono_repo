from pydantic import ConfigDict
from uuid import UUID
from datetime import datetime
from .userSchema import UserBase

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    is_active: bool
    is_verified: bool

    model_config = ConfigDict(from_attributes=True)
