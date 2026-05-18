import enum
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship ,Mapped, mapped_column , Enum
from  app.model.BaseModel import BaseModel
from .enumModel import RoleEnum

class SharedNote(BaseModel):
    __tablename__ = "shared_notes"

    note_id : Mapped[int] = mapped_column(ForeignKey("notes.id", ondelete="CASCADE"), nullable=False)
    shared_with_user_id : Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    shared_by_user_id : Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    permission : Mapped[RoleEnum] = mapped_column(Enum(RoleEnum), default=RoleEnum.VIEW, nullable=False)

    # Relationships
    note = relationship("Note", back_populates="shared_notes")
    shared_with_user = relationship("User", foreign_keys=[shared_with_user_id])
    shared_by_user = relationship("User", foreign_keys=[shared_by_user_id])

