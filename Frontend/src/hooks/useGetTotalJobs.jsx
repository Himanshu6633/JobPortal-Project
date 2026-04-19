import { setTotalJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetTotalJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTotalJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getAllJobs`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setTotalJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                dispatch(setTotalJobs([]));
            }
        }
        fetchTotalJobs();
    }, [dispatch])
}

export default useGetTotalJobs