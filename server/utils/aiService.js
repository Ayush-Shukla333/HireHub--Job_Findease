// server/utils/aiService.js
import axios from "axios";

const AI_V1 = process.env.AI_V1_URL || "http://127.0.0.1:8000/analyze";
const AI_V2 = process.env.AI_V2_URL || "http://127.0.0.1:8001/analyze-v2";


export const analyzeResume = async (resumeText, jobDescription) => {
  const url = process.env.AI_USE_V2 === "true" ? AI_V2 : AI_V1;
  try {
    const response = await axios.post(url, {
      resume_text: resumeText,
      job_description: jobDescription
    }, { timeout: 15000 });
    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error.message);
    return { success: false, match_score: 0 };
  } 
};
