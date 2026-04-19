import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setSearchCompanyByText } from '@/redux/companySlice'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'



const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setinput] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input,dispatch])

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto my-10">
                <div className="flex items-center justify-between my-7">
                    <Input
                        className="w-64 font-medium "
                        placeholder="Filter by company name,role"
                        onChange={(e) => {
                            setinput(e.target.value)
                        }}
                    />

                    <Button
                        className="bg-blue-900 text-white"
                        onClick={() => navigate("/admin/jobs/create")}
                    >
                        New Jobs
                    </Button>

                </div>
                <AdminJobsTable />
            </div>
        </div>
    );
};

export default AdminJobs;
