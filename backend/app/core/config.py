from pydantic import computed_field, RedisDsn, PostgresDsn, ConfigDict
from pydantic_settings import BaseSettings
from functools import lru_cache  #Least Recently Used cache for memoization


class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env.dev", extra="ignore")
    
    DATABASE_URL: PostgresDsn
    
    # Raw components from .env.dev
    REDIS_USERNAME: str = "default"
    REDIS_PASSWORD: str
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int = 0

    @computed_field
    @property
    def REDIS_URL(self) -> str:
        # Assembles: redis://default:password@host:port
        return f"redis://{self.REDIS_USERNAME}:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}"


#we used lru_cache to ensure that the settings are loaded only once and cached for future use, improving performance when accessing settings multiple times throughout the application.

@lru_cache
def get_settings() -> Settings: #as per pydanctic docuemntation its recommned to use () after the class name to create an instance of the class and return it, so that we can access the settings in other parts of the application by calling get_settings() function.
    return Settings()


# Create a singleton instance for direct import
settings = get_settings()