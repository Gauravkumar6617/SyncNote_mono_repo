from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime

class AttachmentBase(BaseModel):
    note_id: UUID
    uploaded_by: UUID
    file_name: str
    file_url: str
    file_size: int
    mime_type: str

class AttachmentCreate(AttachmentBase):
    pass

class AttachmentResponse(AttachmentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
