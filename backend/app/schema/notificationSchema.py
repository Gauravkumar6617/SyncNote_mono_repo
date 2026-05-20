from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime

class NotificationBase(BaseModel):
    user_id: UUID
    title: str
    message: str
    is_read: bool = False

class NotificationCreate(NotificationBase):
    pass

class NotificationResponse(NotificationBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
