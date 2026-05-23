from fastapi import APIRouter, Depends
from app.schema.userSchema import UserCreate
from app.service.authService import AuthService
from sqlalchemy.orm import Session
from app.core.db.session import get_db
router=APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register/local")
def register_local(user_in: UserCreate , db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.create_user(user_create=user_in, auth_provider="LOCAL")
