import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { USER_API_ENDPOINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import axios from "axios"

const Navbar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    const logoutHandler = async (e) => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='bg-white flex items-center justify-between mx-auto max-w-6xl h-16 font-googleSans'>
            <div>
                <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
            </div>
            <div className='flex items-center justify-center font-medium gap-10'>
                <ul className='flex gap-5'>
                    {
                        user && user.role == "recruiter" ? (
                            <>
                                <li><Link to={"/admin/companies"}>Companies</Link></li>
                                <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                            </>
                        ) :
                            (
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                    }
                </ul>
                {
                    !user ? (
                        <div className="flex gap-2">
                            <Link to="/Login"><Button className="cursor-pointer">Login</Button></Link>
                            <Link to="/Signup"><Button variant="outline" className="text-white cursor-pointer bg-[#6A38C2] hover:bg-[#4e2792]">Signup</Button></Link>
                        </div>
                    )
                        : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white z-10">
                                    <div className="flex gap-4 my-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                                alt={user.fullname}
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        {
                                            user && user.role == "student" && (
                                                <>
                                                    <div className="flex items-center">
                                                        <User2></User2>
                                                        <Button className="border-none" variant="link">
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                </>
                                            )
                                        }


                                        <div className="flex items-center cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} className="text-[15px] border-none" variant="link">
                                                Logout
                                            </Button>
                                        </div>

                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                }

            </div>
        </div>
    )
}

export default Navbar
