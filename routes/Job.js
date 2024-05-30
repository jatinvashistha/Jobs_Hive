const express = require('express');
const { getAllJobs, postJob, getMyJobs, updateJob, getSingleJob, deleteJob } = require('../controllers/jobController');
const { isAuthenticated } = require('../middleware/auth');


const router = express.Router();
router.route('/alljobs').put(getAllJobs)
router.route('/myjobs').put(isAuthenticated, getMyJobs);
router.route('/postjob').post(isAuthenticated, postJob)
router.route('/update/:id').put(isAuthenticated,updateJob)
router.route('/:id').put(isAuthenticated,getSingleJob).put(isAuthenticated,deleteJob)
module.exports = router