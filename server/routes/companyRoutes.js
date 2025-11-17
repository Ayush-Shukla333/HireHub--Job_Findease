import express from 'express';
import { loginCompany, registerCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, changeJobApplicationStatus, changeVisibility } from '../controllers/companyController.js';
import upload from '../config/multer.js';

const router = express.Router();

//Register a company
router.post('/register',upload.single('image'), registerCompany);

//Company Login
router.post('/login', loginCompany);

//Get company data
router.get('/company', getCompanyData);

//Post a job
router.post('/post-job', postJob);

//Get applicants data of the company
router.get('/applicants', getCompanyJobApplicants)

//Get company job list
router.get('/list-jobs', getCompanyPostedJobs)

//Change application status
router.post('/change-status', changeJobApplicationStatus)

//Change applications visibility
router.post('/change-visibility', changeVisibility)

export default router;