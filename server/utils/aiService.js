import axios from "axios";

export const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/analyze", {
            resume_text: resumeText,
            job_description: jobDescription
        });

        return response.data;
    } 
    catch (error) {
        console.error("AI Service Error:", error.message);
        return { success: false, match_score: 0 };
    }
};
