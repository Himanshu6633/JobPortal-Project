import React from 'react'
import Navbar from "../shared/Navbar"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from "../../utils/constant"
import { toast } from 'sonner'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student"
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading , user} = useSelector(store => store.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_ENDPOINT}/login`, input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Login failed";
            toast.error(message);
        }
        finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div className=''>
            <Navbar>
            </Navbar>
            <div className='flex justify-center items-center mx-auto max-w-3xl mt-6 '>
                <form onSubmit={submitHandler} className='w-1/2 border-gray-200 rounded-md p-4 my-8 border-2'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-3'>
                        <Label className="mb-2">Email</Label>
                        <Input
                            type="email"
                            placeholder="xyz@gmail.com"
                            name="email"
                            onChange={changeEventHandler}
                            value={input.email}
                            autoComplete="current-username"
                        ></Input>
                    </div>
                    <div className='my-3'>
                        <Label className="mb-2">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            onChange={changeEventHandler}
                            value={input.password}
                            autoComplete="current-password"
                        ></Input>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                        <RadioGroup defaultValue="Student" className="flex items-center gap-4 my-1">
                            <div className="flex items-center gap-1">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    id="student"
                                    className="cursor-pointer "
                                    checked={input.role == "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Input type="radio"
                                    name="role"
                                    value="recruiter"
                                    id="recruiter"
                                    className="cursor-pointer"
                                    checked={input.role == "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading
                            ?
                            <Button disabled className="w-full my-4">
                                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                Please wait
                            </Button>
                            :
                            <Button type="submit" className='bg-blue-900 w-full my-4 text-white'>Login</Button>
                    }
                    <span className='text-small'>Don't have an account? <Link to="/Signup" className='text-blue-600 font-medium'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login