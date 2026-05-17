from sqlalchemy import text

def test_db(db):
    result = db.execute(text("SELECT 1"))
    assert result.scalar() == 1