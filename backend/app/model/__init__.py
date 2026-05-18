# app/models/__init__.py

# 1. Import your Base or BaseModel
from app.core.db.session import Session  
from app.model.BaseModel import Base ,BaseModel

# 2. Import ALL your models here so SQLAlchemy registers them
# from app.model.userModel import User
# from app.models.note import Note # Add other models as you create them

# 3. Export them explicitly (good practice)
__all__ = ["Base", "BaseModel"]