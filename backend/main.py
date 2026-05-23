"""
SyncNote Backend Application

Main entry point for the FastAPI application.
Handles initialization of the FastAPI app, middleware setup, and router registration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.db.session import engine, Base
from app.api.v1.endpoint import authEndpoint as auth_router

# Create FastAPI application instance
app = FastAPI(
    title="SyncNote API",
    description="Backend API for SyncNote application",
    version="1.0.0"
)

# Initialize database tables
# Base.metadata.create_all(bind=engine)


# Health check endpoint
@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint to verify API is running."""
    return {"message": "SyncNote API is running", "status": "ok"}


# Include API routers
app.include_router(auth_router, prefix="/api/v1", tags=["Authentication"])


# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict this in production to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    import uvicorn

    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )