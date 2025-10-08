from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.sentiment import analyze_text
from datetime import datetime

app = FastAPI(title="Sentiment MVP")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    text: str
    label: str
    polarity: float
    subjectivity: float
    timestamp: str

@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text must not be empty")
    if len(text) > int(app.state.max_text_length if hasattr(app.state, 'max_text_length' ) else 4000):
        raise HTTPException(status_code=400, detail="Text too long")
    result = analyze_text(text)
    return AnalyzeResponse(
        text=text,
        label=result["label"],
        polarity=result["polarity"],
        subjectivity=result["subjectivity"],
        timestamp=datetime.utcnow().isoformat() + "Z"
    )

@app.on_event("startup")
def startup():
    import os
    # load config from env (simple)
    app.state.max_text_length = int(os.getenv("MAX_TEXT_LENGTH", "4000"))
