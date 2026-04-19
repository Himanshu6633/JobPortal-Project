import axios from "axios";
import { toast } from "sonner";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { removeAdminJob } from "@/redux/jobSlice";

const useRemoveJob = () => {
  const dispatch = useDispatch();

  const removeJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `${JOB_API_ENDPOINT}/deleteJob/${jobId}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(removeAdminJob(jobId));
        toast.success("Job deleted successfully");
        return true;
      } else {
        toast.error(res?.data?.message || "Failed to delete job");
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  return { removeJob };
};

export default useRemoveJob;
