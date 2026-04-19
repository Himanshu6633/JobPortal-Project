import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.jobs);
    const dispatch = useDispatch();
    useEffect(() => {
    return () => {
        dispatch(setSearchedQuery(""));
    };
}, [dispatch]);
    return (
        <div className='font-googleSans'>
            <Navbar />
            <div className='max-w-5xl my-10 mx-auto'>
                <h1 className='font-bold my-3 text-xl'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return <Job key={job._id} job={job} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;
