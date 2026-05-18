from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.model.BaseModel import BaseModel
import uuid
class Notification(BaseModel):
    __tablename__ = "notifications"

    user_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    title : Mapped[str] = mapped_column(String(100), nullable=False)

    message : Mapped[str] = mapped_column(Text, nullable=False)

    is_read : Mapped[bool] = mapped_column(Boolean, default=False)

    user = relationship("User", back_populates="notifications")