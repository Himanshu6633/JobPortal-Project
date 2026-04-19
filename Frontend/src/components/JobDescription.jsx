import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  /* ------------------------------------
     Fetch single job
  ------------------------------------ */
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/getJob/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          // IMPORTANT: ObjectId → string comparison
          const applied = res.data.job.applications.some(
            application =>
              application.applicant._id === user?._id
          );

          setIsApplied(applied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId && user?._id) {
      fetchSingleJob();
    }
  }, [jobId, user?._id, dispatch]);

  /* ------------------------------------
     Apply Job
  ------------------------------------ */
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setIsApplied(true);

        // Real-time UI update
        const updatedJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user._id },
          ],
        };
        dispatch(setSingleJob(updatedJob));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Apply failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position} position
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          onClick={applyJobHandler}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32AD] text-white"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
        Job Description
      </h1>

      <div className="my-4 space-y-2">
        <p>
          <strong>Role:</strong>{" "}
          <span className="text-gray-800">{singleJob?.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="text-gray-800">{singleJob?.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="text-gray-800">{singleJob?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="text-gray-800">
            {singleJob?.experienceLevel}yrs
          </span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
