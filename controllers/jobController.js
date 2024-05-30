const Job = require('../models/jobSchema')

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({})
        res.status(200).json({
            success: true,
            jobs
        })
        

    } catch (e) {
        res.status(500).json({
            success: false,
            message : e.message
        })
    }
}
exports.postJob = async (req, res) => {
    try {
        const { role } = req.user;
        if (role === 'Job Seeker') {
            return res.status(400).json({
                success: false,
                message : "Job seeker is not allow to access the api"
            })
        }
        const { title, description, category, country ,city ,location,fixedSalary,salaryFrom,salaryTo}
            = req.body;
        if (!title || !description || !category || !country || !city || !location) {
            return res.status(400).json({
                success: false,
                message : "Please fill all details"
            })
            
        }
        if ((!salaryFrom || !salaryTo) && !fixedSalary) {
              return res.status(400).json({
                success: false,
                message: "Please provide one of the salary",
              });
        }
        if (salaryFrom && salaryTo && fixedSalary) {
              return res.status(400).json({
                success: false,
                message: "Provide just one type of salary",
              });
        }
        const postedBy = req.user._id;
        const job = await Job.create({
             title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,

        })
        res.status(200).json({
            success: true,
            message: "Job posted successfully",
            job
        })




    } catch (e) {
        res.status(500).json({
            success: false,
            message : e.message
        })
    }
}
exports.getMyJobs = async (req, res) => {
    try {
        const { role } = req.user;
        if (role === "Job Seeker") {
            return res.status(400).json({
                success: false,
                message : "Job seekers can't access"
          })
        }





        const jobs = await Job.find({
            postedBy : req.user._id
        })
        res.status(200).json({
            success: true,
            jobs
        })


    } catch (e) {
        res.status(500).json({
            success: false,
            message : e.message
        })
    }
}
exports.updateJob = async (req, res) => {
    try {
         const { role } = req.user;
             if (role === "Job Seeker") {
               return res.status(400).json({
                 success: false,
                 message: "Job seekers can't access",
               });
        }

          const { id } = req.params;
          let job = await Job.findById(id);
          if (!job) {
            return  res.status(400).json({
                 success: false,
                 message: "Job not found",
               });
          }



console.log(req.body.title)
        const nowJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
       });
        
  res.status(200).json({
    success: true,
      message: "Job Updated!",
      nowJob
  });

        





    } catch (e) {
        res.status(500).json({
            success: false,
            message : e.message
        })
    }
}
exports.getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(400).json({
          success: false,
          message: "Job not found",
        });
    }
    res.status(200).json({
      success: true,
      job,
    });
        



    } catch (e) {
        res.status(500).json({
            success: false,
            message : e.message
        })
    }
}
exports.deleteJob = async (req, res) => {
    try {

const { role } = req.user;
if (role === "Job Seeker") {
  return     res.status(400).json({
                 success: false,
                 message: "Job seekers can't access",
               });
}
const { id } = req.params;
const job = await Job.findById(id);
if (!job) {
     return res.status(400).json({
       success: false,
       message: "Job not found",
     })
}
await job.deleteOne();
res.status(200).json({
  success: true,
    message: "Job Deleted!",
  job
});
    } catch (e) {
        res.status(500).json({
            success: false,
            message : e.message
        })
    }
}
