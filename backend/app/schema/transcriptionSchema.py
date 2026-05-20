from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class TranscriptionBase(BaseModel):
    user_id: UUID
    note_id: UUID
    audio_url: Optional[str] = None
    langugae: Optional[str] = None
    transcription_text: Optional[str] = None
    summary: Optional[str] = None

class TranscriptionCreate(TranscriptionBase):
    pass

class TranscriptionResponse(TranscriptionBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
