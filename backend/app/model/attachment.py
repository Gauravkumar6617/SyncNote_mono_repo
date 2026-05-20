import uuid

from sqlalchemy import (
    String,
    ForeignKey,
    Integer
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.model.BaseModel import BaseModel


class Attachment(BaseModel):
    __tablename__ = "attachments"

    note_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("notes.id", ondelete="CASCADE")
    )

    uploaded_by: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )

    file_name: Mapped[str] = mapped_column(
        String(255)
    )

    file_url: Mapped[str] = mapped_column(
        String(1000)
    )

    file_size: Mapped[int] = mapped_column(
        Integer
    )

    mime_type: Mapped[str] = mapped_column(
        String(100)
    )

    note = relationship("Note")