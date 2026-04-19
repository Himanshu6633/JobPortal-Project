import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'  
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setinput] = useState("")
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input))
    },[input,dispatch])

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto my-10">
                <div className="flex items-center justify-between my-7">
                    <Input
                        className="w-64 font-medium "
                        placeholder="Filter by company name"
                        onChange ={(e)=>{
                            setinput(e.target.value)
                        }}
                     />

                    <Button
                        className="bg-black text-white"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company
                    </Button>

                </div>
                <CompaniesTable />
            </div>
        </div>
    );
};

export default Companies;
