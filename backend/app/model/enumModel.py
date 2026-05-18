from sqlalchemy import String ,Boolean,Enum
import enum

class AuthProvider(str,enum.Enum):
    GOOGLE="google"
    GITHUB="github"
    LOCAL="local"

class StatusEnum(str,enum.Enum):
    PENDING="pending"
    COMPLETED="completed"
    DELETED="deleted"
    ARCHIVED="archived"

class RoleEnum(str,enum.Enum):
    USER="user"
    ADMIN="admin"
    EDIT="editor"