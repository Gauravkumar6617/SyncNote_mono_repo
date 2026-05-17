import sys
import os
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock

# Add the backend directory to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

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


# Redis fixture - Mock version for testing
@pytest.fixture
def redis():
    """Provide a mocked RedisClient for testing without requiring actual Redis server."""
    mock_redis = MagicMock(spec=RedisClient)
    mock_redis.set = AsyncMock(return_value=True)
    mock_redis.get = AsyncMock(return_value=b"b")
    mock_redis.delete = AsyncMock(return_value=True)
    mock_redis.exists = AsyncMock(return_value=True)
    mock_redis.expire = AsyncMock(return_value=True)
    return mock_redis
