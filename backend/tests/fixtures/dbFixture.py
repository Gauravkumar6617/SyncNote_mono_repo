from app.core.db.session import SessionLocal
import pytest

@pytest.fixture
def db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()