from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.model.BaseModel import BaseModel
import uuid

class NoteFolder(BaseModel):
    __tablename__ = "note_folders"

    note_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("notes.id",ondelete="CASCADE"), primary_key=True)

    folder_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("folders.id", ondelete="CASCADE"), primary_key=True)