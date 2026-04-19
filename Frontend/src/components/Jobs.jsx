import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import useGetTotalJobs from '@/hooks/useGetTotalJobs';

const Jobs = () => {
    useGetTotalJobs();

    const { totalJobs = [] } = useSelector(store => store.jobs);

    const [filterValue, setFilterValue] = useState("");
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        if (filterValue) {
            const filtered = totalJobs.filter(job =>
                job.title?.toLowerCase().includes(filterValue.toLowerCase()) ||
                job.description?.toLowerCase().includes(filterValue.toLowerCase()) ||
                job.location?.toLowerCase().includes(filterValue.toLowerCase())
            );
            setFilterJobs(filtered);
        } else {
            setFilterJobs(totalJobs);
        }
    }, [filterValue, totalJobs]);

    return (
        <div className='font-googleSans'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-1 flex gap-5'>
                <div className='w-[20%]'>
                    <FilterCard onFilterChange={setFilterValue} />
                </div>

                <div className='flex-1'>
                    {filterJobs.length === 0 ? (
                        <span>No Job Available</span>
                    ) : (
                        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        //     <AnimatePresence>
                        //         {filterJobs.map(job => (
                        //             <motion.div
                        //                 key={job._id}
                        //                 initial={{ opacity: 0, x: 100 }}
                        //                 animate={{ opacity: 1, x: 0 }}
                        //                 exit={{ opacity: 0, x: -100 }}
                        //                 transition={{ duration: 0.5 }}
                        //             >
                        //                 <Job job={job} />
                        //             </motion.div>
                        //         ))}
                        //     </AnimatePresence>
                        // </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
    <AnimatePresence mode="popLayout">
        {filterJobs.map(job => (
            <motion.div
                key={job._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Job job={job} />
            </motion.div>
        ))}
    </AnimatePresence>
</div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
