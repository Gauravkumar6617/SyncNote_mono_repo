# app/models/__init__.py

# 1. Import your Base or BaseModel
from app.core.db.session import Session  
from app.model.BaseModel import Base ,BaseModel
from app.model.userModel import User
from app.model.noteModel import Note
from app.model.attachment import Attachment
from app.model.sharedNote import SharedNote
from app.model.enumModel import StatusEnum, RoleEnum
from app.model.noteVersionModel import NoteVersion
from app.model.refreshTokenModel import RefreshToken
from app.model.folderModel import Folder
from app.model.noteFolderModel import NoteFolder
from app.model.notification import Notification
from app.model.transcription import Transcription    

# 2. Import ALL your models here so SQLAlchemy registers them
# from app.model.userModel import User
# from app.models.note import Note # Add other models as you create them

# 3. Export them explicitly (good practice)
__all__ = ["Base", "BaseModel", "User", "Note", "Attachment", "SharedNote", "StatusEnum", "RoleEnum", "NoteVersion", "RefreshToken", "Folder", "NoteFolder", "Notification", "Transcription"]