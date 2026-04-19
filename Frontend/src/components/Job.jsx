import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "";

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();

        const diffDays = Math.floor(
            (currentTime - createdAt) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        return `${diffDays} days ago`;
    };


    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 h-full flex flex-col justify-between border'>
            <div className='flex items-center justify-between'>
                <p className="text-[14px] text-gray-500">
                    {daysAgoFunction(job?.createdAt)}
                </p>

                <Button className="rounded-full" size="icon"><Bookmark className='font-black'></Bookmark>
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                {/* <Button size="icon"> */}
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src={job?.company?.logo}
                            alt="Profile"
                            className="object-cover"
                        />
                    </Avatar>
                <div>
                    <h1 className='font-medium text-md '>{job?.company?.name}</h1>
                    <p className='text-[14px] text-gray-500 '>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 '>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className="border-gray-300 text-gray-800 cursor-pointer">Details</Button>
                <Button className="bg-[#7209b7] text-white cursor-pointer">Save for later</Button>
            </div>
        </div>
    )
}

export default Job



