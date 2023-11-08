import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .responsemodel import ResponseModel, Query
from .util.scraper import Scraper

app: FastAPI = FastAPI()
ENDPOINT = "/api"

origins: list = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=ResponseModel)
async def default():
    return ResponseModel(success=True, message={"working": True})

@app.get(f"{ENDPOINT}/", response_model=ResponseModel)
async def default_router():
    return ResponseModel(success=True, message={"version": "v0.0.1"})

@app.post(f"{ENDPOINT}/query", response_model=ResponseModel)
async def test(query: Query):
    print(query)
    type: str = query.type
    link: str = json.loads(query.content)
    question: str = query.question

    if not type or not link or not question:
        return ResponseModel(success=False, message="Missing required fields")

    return_message = Scraper.process_request(type, link, question)

    return ResponseModel(success=True, message={"return": return_message})