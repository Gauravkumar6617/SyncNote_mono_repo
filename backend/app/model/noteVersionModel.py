from sqlachemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.model.BaseModel import BaseModel
from datetime import datetime
import uuid
class NoteVersion(BaseModel):
    __tablename__ = "note_versions"

    note_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("notes.id", ondelete="CASCADE"), nullable=False)
    version_number : Mapped[int] = mapped_column(Integer, nullable=False)
    title : Mapped[str] = mapped_column(String(50), nullable=False)
    content : Mapped[str] = mapped_column(String, nullable=False)

    edit_by : Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True) 

    note = relationship("Note", back_populates="versions")