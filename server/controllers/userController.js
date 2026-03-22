//routes for user where user can apply for any job and view the applicstions data and update the resume
import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import { analyzeResume } from "../utils/aiService.js";
import { extractTextFromPDF } from '../utils/extractResumeText.js';

//Get user data
export const getUserData = async (req, res) => { //add authentication using clerk middleware

    const userId = req.auth.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Apply for a job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {
        // 1. Check if already applied
        const isAlreadyApplied = await JobApplication.findOne({ userId, jobId });
        if (isAlreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "User has already applied for this job",
            });
        }

        // 2. Validate Job
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // 3. Fetch user + resume
        const userData = await User.findById(userId);
        const resumeText = userData?.resumeText || "";
        const jobDescription = jobData.description || "";

        console.log("========== AI DEBUG ==========");
        console.log("Resume Text Length:", resumeText.length);
        console.log("Resume Text Preview:", resumeText.substring(0, 100));
        console.log("Job Description Length:", jobDescription.length);
        console.log("================================");

        let matchScore = 0;

        // 4. Try AI scoring (non-blocking)
        if (resumeText.length > 10 && jobDescription.length > 5) {
            try {
                console.log("🤖 Calling AI Service...");
                const aiResult = await analyzeResume(resumeText, jobDescription);
                matchScore = aiResult?.match_score || 0;
            } catch (err) {
                console.log("⚠ AI scoring failed — continuing without score");
            }
        }

        // 5. Save Application
        const newApplication = await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            matchScore,
            status: "Pending",
            date: Date.now(),
        });

        return res.json({
            success: true,
            message: "Applied successfully",
            match_score: matchScore,
            application: newApplication,
        });

    } catch (error) {
        console.error("❌ Apply Job Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message,
        });
    }
};
//Get user's applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const applications = await JobApplication.find({ userId })
            .populate('jobId', 'title description location category level salary')
            .populate('companyId', 'name email image')
            .exec()
        if (!applications) {
            return res.status(404).json({ success: false, message: 'No applications found for this user' });
        }
        return res.json({ success: true, applications });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//Update user's profile/resume

export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile = req.file;

        console.log("========== RESUME UPLOAD DEBUG ==========");
        console.log("User ID:", userId);
        console.log("File received:", resumeFile ? "YES" : "NO");
        console.log("File path:", resumeFile?.path);
        console.log("==========================================");

        if (!resumeFile) {
            return res.status(400).json({
                success: false,
                message: "No resume file provided"
            });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Upload to Cloudinary
        const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
            resource_type: 'raw'
        });
        userData.resume = resumeUpload.secure_url;

        // Extract text from PDF
        const { extractTextFromPDF } = await import('../utils/extractResumeText.js');
        const extractedText = await extractTextFromPDF(resumeFile.path);

        console.log("========== TEXT EXTRACTION DEBUG ==========");
        console.log("Extracted text length:", extractedText.length);
        console.log("Extracted text preview:", extractedText.substring(0, 200));
        console.log("============================================");

        userData.resumeText = extractedText;
        await userData.save();

        // Clean up local file
        const fs = await import('fs');
        if (fs.default.existsSync(resumeFile.path)) {
            fs.default.unlinkSync(resumeFile.path);
        }

        return res.json({
            success: true,
            message: 'Resume updated successfully',
            resumeTextExtracted: extractedText.length > 0
        });
    }
    catch (error) {
        console.error("❌ Resume Upload Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};