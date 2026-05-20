from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime
from app.model.enumModel import StatusEnum

class NoteBase(BaseModel):
    title: str
    content: str
    status: Optional[StatusEnum] = StatusEnum.PENDING
    ispinned: Optional[bool] = False
    is_deleted: Optional[bool] = False

class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    status: Optional[StatusEnum] = None
    ispinned: Optional[bool] = None
    is_deleted: Optional[bool] = None
    version: Optional[int] = None

class NoteResponse(NoteBase):
    id: UUID
    owner_id: UUID
    version: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
