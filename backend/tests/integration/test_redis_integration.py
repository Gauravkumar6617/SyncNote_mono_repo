import pytest

@pytest.mark.asyncio
async def test_redis(redis):
    await redis.set("a", "b")
    value = await redis.get("a")

    assert value == b"b"