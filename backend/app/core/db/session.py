from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from app.core.config import get_settings

settings = get_settings()

# Convert PostgresDsn object to a plain string for SQLAlchemy
DATABASE_URL = str(settings.DATABASE_URL)

# 1. Professional Engine Configuration
# pool_pre_ping=True: Automatically checks and drops stale or disconnected connections
# pool_size / max_overflow: Prevents your app from running out of DB connections under load
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

# 2. Session Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Base Declarative Class
Base = declarative_base()

# 4. Context-managed Dependency Injection
def get_db() -> Generator[Session, None, None]:
    """
    Provides a transactional scope around a series of operations.
    Ensures connections are properly closed after the request lifecycle.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()