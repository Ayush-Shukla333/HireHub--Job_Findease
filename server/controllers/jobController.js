import Job from "../models/Job.js"

//Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
        .populate({path:'companyId', select:'-password'});

        res.json({success: true, jobs});
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

//Get single job by ID
export const getJobById = async (req, res) => {
    try {
        const {id} = req.params;
        const job = await Job.findById(id)
        .populate({path:'companyId', select:'-password'});

        if(!job) {
            return res.json({success: false, message: 'Job not found'});
        }
        res.json({
            success: true,
            job
        })
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

// server/controllers/jobController.js — ADD these

// Update a job
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.company._id;

        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Verify ownership
        if (job.companyId.toString() !== companyId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this job"
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.json({ success: true, job: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.company._id;

        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.companyId.toString() !== companyId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        await Job.findByIdAndDelete(id);
        // Also delete related applications
        await JobApplication.deleteMany({ jobId: id });

        res.json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};