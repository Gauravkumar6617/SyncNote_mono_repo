import enum
from sqlalchemy import String, Boolean, Enum, Text
from sqlalchemy.orm import Mapped, mapped_column ,relationship
from app.model.BaseModel import BaseModel
from app.model.enumModel import AuthProvider

class User(BaseModel):
    __tablename__="users"

    username : Mapped[str] = mapped_column(String(30),unique=True,nullable=False,index=True)#for identity
    email : Mapped[str] = mapped_column(String(50),unique=True,nullable=False,index=True) #for identity
    profile_picture : Mapped [str | None ] = mapped_column(Text,nullable=True)

    fullname : Mapped[str] = mapped_column(String(50),nullable=False)
    bio : Mapped[str] = mapped_column(Text,nullable=True)

    password_hash :Mapped[str] = mapped_column(String(255),nullable=False)
    auth_provider : Mapped[AuthProvider] = mapped_column(Enum(AuthProvider),default=AuthProvider.LOCAL) #login type

    is_active : Mapped[bool] = mapped_column(Boolean,default=True)
    is_verified : Mapped[bool] = mapped_column(Boolean,default=False)




    # relation of user with others

    notes = relationship("Note",back_populates="owner",cascade="all,delete-orphan")
    folders = relationship("Folder",back_populates="folder",cascade="all,delete-orphan")
    refresh_tokens = relationship("RefreshToken", back_populates="user", cascade="all, delete-orphan")


       
 