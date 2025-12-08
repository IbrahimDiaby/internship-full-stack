from fastapi import FastAPI

from controllers.ai.ai import ai_router
from controllers.auth.auth import auth_router
from models.database import create_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Internship-full-stack")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(ai_router, prefix="/api")

@app.on_event("startup")
def on_startup():
    create_db()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

