from sqlalchemy import Column, String, ForeignKey ,Text
from sqlalchemy.orm import relationship,Mapped, mapped_column
from app.model.BaseModel import BaseModel
import uuid

class Transcription(BaseModel):
    __tablename__ = "transcriptions"

    user_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    note_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("notes.id", ondelete="CASCADE"), nullable=False)

    audio_url : Mapped[str] = mapped_column(String(1000), nullable=True)

    langugae : Mapped[str | None] = mapped_column(String(50), nullable=True)

    transcription_text : Mapped[str | None] = mapped_column(Text, nullable=True)

    summary : Mapped[str | None] = mapped_column(Text, nullable=True)



    note = relationship("Note", back_populates="transcription")