from textblob import TextBlob
import os

POS_THRESH = float(os.getenv("POS_THRESH", "0.1"))
NEG_THRESH = float(os.getenv("NEG_THRESH", "-0.1"))

def analyze_text(text: str) -> dict:
    tb = TextBlob(text)
    polarity = round(tb.sentiment.polarity, 4)
    subjectivity = round(tb.sentiment.subjectivity, 4)
    if polarity > POS_THRESH:
        label = "positive"
    elif polarity < NEG_THRESH:
        label = "negative"
    else:
        label = "neutral"
    return {"label": label, "polarity": polarity, "subjectivity": subjectivity}
