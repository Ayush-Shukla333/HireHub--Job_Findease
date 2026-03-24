# ai/app_v2.py
import spacy
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nlp = spacy.load("en_core_web_md")
app = FastAPI()

class ResumeInput(BaseModel):
    resume_text: str
    job_description: str

def extract_skills(doc):
    """Extract noun chunks and entities as skills"""
    skills = set()
    for chunk in doc.noun_chunks:
        skills.add(chunk.text.lower().strip())
    for ent in doc.ents:
        skills.add(ent.text.lower().strip())
    return skills

@app.post("/analyze-v2")
def analyze_v2(data: ResumeInput):
    resume_doc = nlp(data.resume_text)
    jd_doc = nlp(data.job_description)

    # 1. Semantic Similarity (spaCy)
    semantic_score = resume_doc.similarity(jd_doc)

    # 2. TF-IDF Cosine Similarity
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([
        data.resume_text,
        data.job_description
    ])
    tfidf_score = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

    # 3. Skill Matching
    resume_skills = extract_skills(resume_doc)
    jd_skills = extract_skills(jd_doc)
    matched_skills = resume_skills & jd_skills
    missing_skills = jd_skills - resume_skills

    skill_score = (
        len(matched_skills) / len(jd_skills)
        if jd_skills else 0
    )

    # 4. Weighted Final Score
    final_score = (
        semantic_score * 0.35 +
        tfidf_score * 0.35 +
        skill_score * 0.30
    )

    return {
        "success": True,
        "match_score": round(final_score * 100, 2),
        "semantic_score": round(semantic_score * 100, 2),
        "tfidf_score": round(tfidf_score * 100, 2),
        "skill_match_score": round(skill_score * 100, 2),
        "matched_skills": list(matched_skills)[:20],
        "missing_skills": list(missing_skills)[:20],
        "total_resume_skills": len(resume_skills),
        "total_jd_skills": len(jd_skills)
    }

@app.get("/health")
def health():
    return {"status": "ok", "version": "v2"}