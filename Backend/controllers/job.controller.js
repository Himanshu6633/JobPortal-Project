import mongoose from "mongoose";
import { Job } from "../models/jobModel.js";
import { Company } from "../models/companyModel.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;
        const userId = req.id;
        if (
            !title || !description || !requirements || !salary ||
            !location || !jobType || !position || !companyId || !experience
        ) {
            return res.status(400).json({
                message: "Something is missing !!",
                success: false
            });
        }

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID",
                success: false
            });
        }

        const companyExists = await Company.findById(companyId);
        if (!companyExists) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        // sanitize and parse numeric fields
        const parsedSalary = Number(salary);
        const parsedPosition = Number(position);

        // extract numeric value from experience like "3 yrs" -> 3
        let parsedExperience = experience;
        if (typeof experience === "string") {
            const m = experience.match(/[\d.]+/);
            parsedExperience = m ? Number(m[0]) : NaN;
        } else {
            parsedExperience = Number(experience);
        }

        if (isNaN(parsedExperience)) {
            return res.status(400).json({
                message: "Invalid experience format. Provide a number or string like '3' or '3 yrs'.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: typeof requirements === 'string' ? requirements.split(",") : requirements,
            salary: isNaN(parsedSalary) ? undefined : parsedSalary,
            location,
            position: isNaN(parsedPosition) ? undefined : parsedPosition,
            jobType,
            experienceLevel: parsedExperience,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully !!",
            success: true,
            job
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs, // can be empty array
            success: true,
            message: jobs.length === 0 ? "No jobs found" : "Jobs fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate("company")
            .populate({
                path: "applications",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "applicant",
                    select: "_id fullname email profile.profilePhoto profile.resumeOriginalName"
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Something went wrong",
            success: false
        });
    }
}
// admin kitne job create kra hai

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id // logged in user id     
        const jobs = await Job.find({ created_by: adminId }).populate("company")
            .sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs created",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
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

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId || req.params.id;
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully",
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

export const editJob = async (req, res) => {
    try {
        const jobId = req.params.jobId || req.params.id;
        const job = await Job.findById(jobId);
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        job.title = req?.body?.title;
        job.requirements = req?.body?.requirements;
        job.description = req?.body?.description;
        job.salary = req?.body?.salary;
        job.location = req?.body?.location;
        job.jobType = req?.body?.jobType;
        job.experienceLevel = req?.body?.experience;
        job.position = req?.body?.position;
        job.company = req?.body?.companyId

        await job.save();

        return res.status(200).json({
            message: "Job Edited successfully",
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
