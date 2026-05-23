from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.db.session import engine , Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}



from app.api.v1.endpoint import authEndpoint as auth_router



app.include_router(auth_router.router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)