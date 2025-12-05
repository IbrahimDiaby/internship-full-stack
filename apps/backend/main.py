from fastapi import FastAPI
from controllers.auth.auth import auth_router
from models.database import create_db

app = FastAPI(title="Internship-full-stack")

app.include_router(auth_router, prefix="/api")

@app.on_event("startup")
def on_startup():
    create_db()

@app.get("/")
def index():
    return {"id": 1, "name": "Test", "comment": "bien" }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

