import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.json({ success: false, message: "Company already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadedImage = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: uploadedImage.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Company
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing Credentials" });
    }

    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company
    res.json({success: true, company})
  }
  catch(error) {
    res.json({success: false, message: error.message});
  }
}

//Post a new job
export const postJob = async (req, res) => {
    const {title, description, location, salary, level, category } = req.body;
    //Create a middleware that helps decode the JWT token and get company ID from it
    const companyId = req.company._id;
    try {
      const newJob = new Job ({
        title,
        description,
        location,
        salary,
        companyId,
        date: Date.now(),
        level,
        category
      })
      await newJob.save()

      res.json({success: true, newJob})
    }
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}

//get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    // Fetch all job applications belonging to this company
    const applications = await JobApplication.find({ companyId })
      .populate("jobId", "title location category level salary")
      .populate("userId", "name image resume")
      .exec();

    return res.json({
      success: true,
      applications: applications.map(app => ({
        _id: app._id,
        user: app.userId,
        job: app.jobId,
        matchScore: app.matchScore ?? 0, // <-- THIS IS THE NEW FIELD
        status: app.status,
        date: app.date
      }))
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



//Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({companyId})

    // Adding number of applicants info in data
    const jobsData = await Promise.all(jobs.map( async (job) => {
      const applicants = await JobApplication.find({jobId: job._id})
      return {...job.toObject(), applicants: applicants.length}
    }))
    res.json({success: true, jobsData });
  }
  catch(error) {
    res.json({success: false, message: error.message});
  }
}

//change job application status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status} = req.body;

    //Find job application and update status
    await JobApplication.findByIdAndUpdate({_id:id}, {status})

    res.json({success: true, message: 'Status Changed'});
  }
  catch {
    res.json({success: false, message: error.message});
  }
}

//change applications visibility
export const changeVisibility = async (req, res) => {
  try {
    const {id} = req.body
    const companyId = req.company._id;
    const job = await Job.findById(id); 
    
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    res.json({success: true, job})
  } 
  catch (error) {
    res.json({success: false, message: error.message});
  }
}