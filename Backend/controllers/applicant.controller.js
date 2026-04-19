// import { express } from "express";
import { Application } from "../Models/applicationModel.js";
// import { Job } from "../Models/jobModel.js";
import { Job } from "../models/jobModel.js";
                                                            // applying for job 
export const applyJob = async (req,res) => {
    try {
        const userId = req.id;
        const jobId  = req.params.id;

        // const company = await 
        if (!jobId) {
            return res.status(400).json({
                message: "Job id required !!",
                success: false
            })
        }

        // check if user has already applied 
        const existingApplication = await Application.findOne({job : jobId,applicant : userId})
        if (existingApplication) {
            return res.status(400).json({
                message: "You hav already applied for this job !!",
                success: false
            })
        }

        // check if job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
            message: "Job not found !!",
            success: false,
        })
        }

        // create new application 
        const newApplication = await Application.create({
            job : jobId,
            applicant:userId
        })
        // console.log(newApplication)
        job.applications.push(newApplication._id);
        await job.save();
        await job.populate({
          path: "applications",
          populate: { path: "applicant", select: "_id fullname" }
        });
        return res.status(201).json({
            message: "Job applied successfully !!",
            success: true,
            job
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong",
            success: false
        });
    }
}
                                                            //user ne kitni jobs pe applied kiya 
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    // Find all applications for this user and populate job -> company
    // console.log(userId);
    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company"
        }
      })
      .sort({ createdAt: -1 });

    if (!applications || applications.length === 0) {
      return res.status(200).json({
      applications: applications || [],
      success: true
    });
    }
    return res.status(200).json({
      applications,
      success: true
    });
    
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Something went wrong",
      success: false
    });
  }
};

                                                    // admin ke post pe kitne users ne apply kiya hai
export const getApplicants = async(req,res)=>{
    try {
        const jobId = req.params.id 
        const job = await Job.findById(jobId).populate(
            {
                path : "applications",
                options : {sort :{createdAt : -1}},
                populate:{
                    path:"applicant"
                }
            }
        )
        if(!job){
            return res.status(404).json({
            message : "Job not found",
            success : false
        }); 
        }
        return res.status(200).json({
            job,
            success : true
        })
    } 
    catch (error) {
        console.log(error);
        
        return res.status(400).json({
            message : "Something went wrong",
            success : false
        });
    }
}
                                        

export const updateStauts = async(req,res)=>{
    try {
        const {status} = req.body // logged in user id     
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
            message : "Status is required",
            success : false
        }); 
        }

        // find the application by applicant Id 
        const application = await Application.findOne({_id : applicationId});
         if(!application){
            return res.status(400).json({
            message : "Application not found",
            success : false
        }); 
        }
        //  Update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message : "Status updated successfully !!",
            success : true
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message : "Something went wrong",
            success : false
        });
    }
}
