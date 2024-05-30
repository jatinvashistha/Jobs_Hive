const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { employeeGetAllApplication, jobSeekerGetAllApplication, jobSeekerDeleteApplication, postApplication } = require('../controllers/applicationController');
const router = express.Router();
router.route("/employeeapplications").put(isAuthenticated, employeeGetAllApplication);
router.route('/jobseekerapplications').put(isAuthenticated, jobSeekerGetAllApplication);
router.route('/jobseekerdeleteapplication/:id').put(isAuthenticated,jobSeekerDeleteApplication)
router.route('/postapplication').post(isAuthenticated,postApplication)
router.route('/deleteapplication/:id').put(isAuthenticated, jobSeekerDeleteApplication);
module.exports = router;