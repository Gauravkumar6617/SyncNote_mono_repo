import pytest
from app.core.db.session import SessionLocal
from app.core.redis.client import RedisClient

# DB fixture
@pytest.fixture
def db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


# Redis fixture
@pytest.fixture
def redis():
    return RedisClient()