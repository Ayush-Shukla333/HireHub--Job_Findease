import express from 'express';
import { loginCompany, registerCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, changeJobApplicationStatus, changeVisibility } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';

const router = express.Router();

//Register a company
router.post('/register',upload.single('image'), registerCompany);

//Company Login
router.post('/login', loginCompany);

//Get company data
router.get('/company', protectCompany, getCompanyData);

//Post a job
router.post('/post-job', protectCompany, postJob);

//Get applicants data of the company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

//Get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

//Change application status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

//Change applications visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router;