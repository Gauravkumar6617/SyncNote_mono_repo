import uuid
from sqlalchemy import (
    String,
    Boolean,
    ForeignKey,
    Text,
    Integer,
    JSON,Enum
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)
from app.model.BaseModel import BaseModel
from datetime import datetime
from app.model.enumModel import StatusEnum


class Note(BaseModel):
    __tablename__= "notes"

    owner_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id",ondelete="CASCADE"))  ### it will mapp to user who had make it

    title : Mapped[str] = mapped_column(String(50),nullable=False)
    content : Mapped[str] = mapped_column(Text,nullable=False)

    status : Mapped[StatusEnum] = mapped_column(Enum(StatusEnum),default=StatusEnum.PENDING)

    ispinned : Mapped[bool] = mapped_column(Boolean,default=False)

    version : Mapped[int] = mapped_column(Integer,default=1)

    is_deleted : Mapped[bool] = mapped_column(Boolean,default=False)

    owner=relationship("User",back_populates="notes")

    shared_notes = relationship("SharedNote", back_populates="note", cascade="all, delete-orphan")

    versions = relationship("NoteVersion", back_populates="note", cascade="all, delete-orphan")





