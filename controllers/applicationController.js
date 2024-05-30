const Application = require("../models/applicationSchema");
const Job = require("../models/jobSchema");

exports.postApplication = async (req, res) => {
  try {
    const { role } = req.user;
    if (!(role === "Job Seeker")) {
      return res.status(400).json({
        success: false,
        message: " Only Job seeker are allowed to access this api.",
      });
    }
    
    
    const { name, email, coverLetter, phone, address, jobId, resume } = req.body;
    


    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details"
      });
    }

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };
      if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
      ) {
        return res.status(400).json({
          success: false,
          message : "Fill all details"
        })
    }
      const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume
      });
      res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
      });





  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e
    });
  }
};
exports.employeeGetAllApplication = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return res.status(400).json({
        success: false,
        message: "  Job seeker are not allowed to access this api.",
      });
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
exports.jobSeekerGetAllApplication = async (req, res) => {
  try {
    const { role } = req.user;
    if (!(role === "Job Seeker")) {
      return res.status(400).json({
        success: false,
        message: " Only Job seeker are allowed to access this api.",
      });
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
exports.jobSeekerDeleteApplication = async (req, res) => {
  try {
    const { role } = req.user;
    if (!(role === "Job Seeker")) {
      return res.status(400).json({
        success: false,
        message: " Only Job seeker are allowed to access this api.",
      });
    }

    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(400).json({
        success: false,
        message : "Application is not found"
      })
    }
    
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
