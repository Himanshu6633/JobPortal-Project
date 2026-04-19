import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async() => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/get`,
          {withCredentials: true}
        );
        if (res.data?.success) {
          // Check backend key carefully
          const jobs = res.data.applications || []; // <-- use 'applicants'
          dispatch(setAllAppliedJobs(jobs));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
        console.error(error);
      }
    };

    fetchAllAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
