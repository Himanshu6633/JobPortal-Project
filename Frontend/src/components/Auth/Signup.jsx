import React from 'react'
import Navbar from "../shared/Navbar"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from "../../utils/constant"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    })

    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <Navbar>
            </Navbar>
            <div className='flex justify-center items-center mx-auto max-w-5xl'>
                <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-3 border-2'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label htmlFor="fullname" className="mb-2">Full Name</Label>
                        <Input id="fullname" type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} required></Input>
                    </div>
                    <div className='my-2'>
                        <Label htmlFor="email" className="mb-2">Email</Label>
                        <Input id="email" type="email" name="email" value={input.email} onChange={changeEventHandler}></Input>
                    </div>
                    <div className='my-2'>
                        <Label htmlFor="phoneNumber" className="mb-2">Phone Number</Label>
                        <Input type="tel" id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} ></Input>
                    </div>
                    <div className='my-2'>
                        <Label htmlFor="password" className="mb-2">Password</Label>
                        <Input name="password" id="password" type="password" value={input.password} onChange={changeEventHandler} ></Input>
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                        <RadioGroup
                            value={input.role}
                            onValueChange={(value) =>
                                setInput({ ...input, role: value })
                            }
                            className="flex items-center gap-4 my-1"
                        >
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="student" id="student" />
                                <Label htmlFor="student">Student</Label>
                            </div>

                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="recruiter" id="recruiter" />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className=' flex justify-center items-center gap-2'>
                            <Label>Profile</Label>
                            <input
                                className="w-60 border border-gray-300 rounded pl-3 cursor-pointer"
                                type="file"
                                accept='image/*'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading
                            ?
                            <Button className="w-full my-4"><Loader2 className='mr-2 w-4 h-4 animate-spin' />Please wait</Button>
                            :
                            <Button type="submit" className='bg-blue-900 w-full my-4 text-white'>Signup</Button>
                    }
                    <span className='text-small'>Already have an account? <Link to="/Login" className='text-blue-600 font-medium'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup


