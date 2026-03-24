import spacy
from fastapi import FastAPI
from pydantic import BaseModel

nlp = spacy.load("en_core_web_md") 

app = FastAPI()

class ResumeInput(BaseModel):
    resume_text: str
    job_description: str

@app.post("/analyze")
def analyze(data: ResumeInput):
    resume_doc = nlp(data.resume_text)
    jd_doc = nlp(data.job_description)

    # Similarity Score
    similarity = resume_doc.similarity(jd_doc)

    return {
        "success": True,
        "match_score": round(similarity * 100, 2)
    }
    