# Sentiment App (MVP)

Full-stack sentiment analysis MVP using:
- FastAPI backend (TextBlob)
- React frontend (Vite)
- Docker + docker-compose

## Quick dev run (no Docker)

### Backend
```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# TextBlob corpora (first time only)
python -m textblob.download_corpora
uvicorn app.main:app --reload --port 8000
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Open the frontend dev server (default Vite port 5173). API base points to http://localhost:8000/api by default.

## Docker (recommended)
```
docker compose up --build
```

The compose file runs backend on port 8000 and frontend on 5173.

## Notes
- TextBlob may require downloading corpora (`python -m textblob.download_corpora`).
- This scaffold is minimal — extend with DB, auth, tests as needed.
