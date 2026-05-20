from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional

class NoteVersionBase(BaseModel):
    note_id: UUID
    version_number: int
    title: str
    content: str
    edit_by: Optional[UUID] = None

class NoteVersionResponse(NoteVersionBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
