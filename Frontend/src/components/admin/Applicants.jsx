import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application)

    useEffect(()=>{
        const fetchApplicants = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${param.id}/applicants`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchApplicants();
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto'>
            <h1 className='font-bold text-xl my-2'>Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable>

            </ApplicantsTable>
        </div>
    </div>
  )
}

export default Applicants