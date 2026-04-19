import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader } from '../ui/table'
import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'

const shortListingStatus = ['Accepted', 'Rejected']


const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
            console.log("called")
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error(error);
        }
    }

    return (
        <Table className="table-fixed w-full">
            <TableCaption className="font-medium">
                A list of your recent applied users
            </TableCaption>

            <TableHeader>
                <TableRow className="font-medium">
                    <TableHead className="w-[20%]">Full Name</TableHead>
                    <TableHead className="w-[20%]">Email</TableHead>
                    <TableHead className="w-[15%]">Contact</TableHead>
                    <TableHead className="w-[15%]">Resume</TableHead>
                    <TableHead className="w-[15%]">Date</TableHead>
                    <TableHead className="w-[15%] text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {applicants?.applications?.map((item) => (
                    <TableRow key={item._id} className={"font-semibold"}>
                        <TableCell className="truncate">
                            {item?.applicant?.fullname}
                        </TableCell>

                        <TableCell className="truncate">
                            {item?.applicant?.email}
                        </TableCell>

                        <TableCell>
                            {item?.applicant?.phoneNumber}
                        </TableCell>

                        {/* <TableCell>
                            {
                                item.applicant?.profile?.resume ? <a
                                    href={item?.applicant?.profile?.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    onClick={() => console.log("RESUME DATA:", item?.applicant?.profile?.resume)}
                                ></a> : <span>NA</span>
                            }
                            <a
                                href={item?.applicant?.profile?.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                                onClick={() => console.log("RESUME DATA:", item?.applicant?.profile?.resume)}
                            >
                                View Resume
                            </a>
                        </TableCell> */}

                        <TableCell>
                            {item?.applicant?.profile?.resume ? (
                                <a
                                    href={item.applicant.profile.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    onClick={() =>
                                        console.log("RESUME DATA:", item.applicant.profile.resume)
                                    }
                                >
                                    View Resume
                                </a>
                            ) : (
                                <span className="text-gray-500">NA</span>
                            )}
                        </TableCell>


                        <TableCell>
                            {new Date(item?.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button>
                                        <MoreHorizontal />
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent className="w-28 bg-white shadow-xl font-medium rounded-lg p-2">
                                    {shortListingStatus.map((status, index) => (
                                        <div
                                            onClick={() =>
                                                statusHandler(status, item?._id)
                                            }
                                            key={index}
                                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                                        >
                                            {status}
                                        </div>
                                    ))}

                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ApplicantsTable
