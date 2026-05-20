from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class FolderBase(BaseModel):
    name: str
    color: Optional[str] = None

class FolderCreate(FolderBase):
    pass

class FolderUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None

class FolderResponse(FolderBase):
    id: UUID
    owner: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class NoteFolderSchema(BaseModel):
    note_id: UUID
    folder_id: UUID
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
