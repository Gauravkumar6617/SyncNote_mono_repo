from app.core.redis.client import RedisClient
import pytest


@pytest.fixture
def redis():
    return RedisClient()
