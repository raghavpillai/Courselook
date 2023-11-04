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