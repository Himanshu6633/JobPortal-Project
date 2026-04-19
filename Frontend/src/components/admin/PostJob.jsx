import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector(store => store.company);

  const selectChangeHandler = (value) =>{
    // value is the selected company's id
    setInput({...input, companyId: value});
  };

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/postJob`,input,{withCredentials:true})
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-800 shadow-lg rounded-md'>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                onChange={changeEventHandler}
                value={input.title}
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                onChange={changeEventHandler}
                value={input.description}
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                onChange={changeEventHandler}
                value={input.requirements}
                type="text"
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                onChange={changeEventHandler}
                value={input.salary}
                type="text"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                onChange={changeEventHandler}
                value={input.location}
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                onChange={changeEventHandler}
                value={input.jobType}
                type="text"
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                onChange={changeEventHandler}
                value={input.experience}
                type="text"
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                onChange={changeEventHandler}
                value={input.position}
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            {
              companies.length > 0 && (


                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a company"/>
                  </SelectTrigger>
                  <SelectContent className={'bg-white'}>
                    <SelectGroup>
                      {
                        companies.map((company)=>{
                          return (
                            <SelectItem key={company._id} className={"font-medium"} value={company._id}>
                              {company.name}
                            </SelectItem>
                          )
                        })
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
          </div>
          {loading ? (
                        <Button disabled className="w-full mt-8">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-8 bg-blue-950 text-white">
                            Post New Job
                        </Button>
                    )}
          {
            companies.length == 0
              ?
              <p className='text-sm text-red-800 font-bold text-center my-3'>Please register a company first before posting a job</p>
              :
              <p></p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob