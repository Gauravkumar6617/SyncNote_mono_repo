from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from app.model.enumModel import RoleEnum
from typing import Optional

class SharedNoteBase(BaseModel):
    note_id: UUID
    shared_with_user_id: UUID
    shared_by_user_id: UUID
    permission: Optional[RoleEnum] = RoleEnum.EDIT

class SharedNoteCreate(SharedNoteBase):
    pass

class SharedNoteResponse(SharedNoteBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
