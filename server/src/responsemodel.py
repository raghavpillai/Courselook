from pydantic import BaseModel
from typing import Dict, Any

class ResponseModel(BaseModel):
    success: bool
    message: str | Dict[str, Any]


class Query(BaseModel):
    type: str | None = None
    content: str | None = None
    question: str | None = None