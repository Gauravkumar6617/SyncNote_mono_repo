from sqlalchemy import DateTime,func
from sqlalchemy.orm import Mapped,mapped_column
from sqlalchemy.orm import DeclarativeBase
from datetime import datetime
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Base(DeclarativeBase):
    pass

class BaseModel(Base):
    __abstract__=True ##this tell the sqlalchmey to not create tabel of this just to inheirt this class

    id:Mapped[uuid.UUID]=mapped_column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    created_at:Mapped[datetime]=mapped_column(DateTime(timezone=True),server_default=func.now())
    updated_at:Mapped[datetime]=mapped_column(DateTime(timezone=True),onupdate=func.now(),server_default=func.now())

    

