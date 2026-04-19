import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto relative my-4 p-5 bg-white border border-gray-200 rounded-2xl">
                <div className='flex justify-between '>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-10 w-10 flex items-center justify-center">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                alt="Profile"
                                className='rounded-full'
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-l'>{user?.fullname}</h1>
                            <p className='text-gray-800'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right absolute top-3 right-5"><Pen /></Button>
                </div>
                <div className='my-3'>
                    <div className='flex gap-3 items-center my-2'>
                        <Mail />
                        <span className='text-gray-800'>{user?.email}</span>
                    </div>
                    <div className='flex gap-3 items-center my-2'>
                        <Contact />
                        <span className='text-gray-800'>{user?.phoneNumber}</span>
                    </div>
                    <div>
                        <h1 className='font-medium'>Skills</h1>
                        <div className='flex items-center gap-2 my-2'>
                            {
                                user?.profile?.skills?.length != 0 ?
                                    user?.profile?.skills.map((item, index) =>
                                        <Badge className={"bg-[#6A38C2] text-white px-3 py-1"} key={index}>{item}</Badge>
                                    )
                                    :
                                    <span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className={"text-md font-medium"}>Resume</Label>
                        {

                            user?.profile?.resume
                                ? (
                                    <a
                                        href={user?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-blue-500 hover:underline cursor-pointer w-min'
                                    >
                                        {user?.profile?.resumeOriginalName || "View resume"}
                                    </a>
                                )
                                : <span>NA</span>
                        }
                    </div>

                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>All applied job</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile