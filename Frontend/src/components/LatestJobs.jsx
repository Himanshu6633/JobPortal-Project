import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const navigate = useNavigate();

  // ✅ DEFAULT VALUE PREVENTS CRASH
  const { allJobs = [] } = useSelector((store) => store.jobs);

  return (
    <div className="max-w-7xl mx-auto my-20 font-googleSans">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </h1>

      <div className="grid grid-cols-3 gap-4 my-8 px-3">
        {allJobs.length === 0 ? (
          <span>No job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => (
              <LatestJobCard key={job._id} job={job} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;

