import uuid

from sqlalchemy import (
    String,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.model.BaseModel import BaseModel


class Folder(BaseModel):
    __tablename__="folders"

    owner : Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id",ondelete="CASCADE"))

    name : Mapped[str] = mapped_column(String(50),nullable=False)
    
    color : Mapped[str] = mapped_column(String(50),nullable=True)

    folder = relationship("User",back_populates="folders")



