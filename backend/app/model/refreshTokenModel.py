from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.model.BaseModel import BaseModel
import uuid
from datetime import datetime
class RefreshToken(BaseModel):
    __tablename__ = "refresh_tokens"

    user_id : Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token : Mapped[str] = mapped_column(String, unique=True, nullable=False)
    expires_at : Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    is_revoked : Mapped[bool] = mapped_column(Boolean, default=False)

    user = relationship("User", back_populates="refresh_tokens")