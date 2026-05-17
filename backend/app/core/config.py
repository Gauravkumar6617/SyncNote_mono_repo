from pydantic import computed_field, RedisDsn
from pydantic_settings import BaseSettings, PostgresDsn
from functools import lru_cache  #Least Recently Used cache for memoization


class Settings(BaseSettings):
    DATABASE_URL: PostgresDsn
    
    # Raw components from .env.dev
    REDIS_USERNAME: str = "default"
    REDIS_PASSWORD: str
    REDIS_HOST: str
    REDIS_PORT: int

    @computed_field
    @property
    def REDIS_URL(self) -> str:
        # Assembles: redis://default:password@host:port
        return f"redis://{self.REDIS_USERNAME}:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}"

    class Config:
        env_file = ".env.dev"
        extra = "ignore"  # Prevents errors if extra variables are in your env file


#we used lru_cache to ensure that the settings are loaded only once and cached for future use, improving performance when accessing settings multiple times throughout the application.

@lru_cache
def get_settings() -> Settings: #as per pydanctic docuemntation its recommned to use () after the class name to create an instance of the class and return it, so that we can access the settings in other parts of the application by calling get_settings() function.
    return Settings()