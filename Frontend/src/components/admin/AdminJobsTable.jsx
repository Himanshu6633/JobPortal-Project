import React, { useEffect, useState } from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { DeleteIcon, Edit, Eye, MoreHorizontal, Trash2Icon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useRemoveJob from './useRemoveJob'
// import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();
    const { removeJob } = useRemoveJob();
    const navogate = useNavigate();
    const handleDelete = async (jobId) => {
        await removeJob(jobId);
    };



    useEffect(() => {
        const filtered = (allAdminJobs || []).filter((job) => {
            if (!searchJobByText) return true;

            const searchText = searchJobByText.toLowerCase();

            const companyName = job?.company?.name?.toLowerCase() || "";
            const jobRole = job?.title?.toLowerCase() || "";

            return (
                companyName.includes(searchText) ||
                jobRole.includes(searchText)
            );
        });

        setFilterJobs(filtered);
    }, [allAdminJobs, searchJobByText]);


    return (
        <div>
            <Table>
                <TableCaption className={'font-medium'}>
                    A list of your recently posted jobs
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center font-medium">Company Name</TableHead>
                        <TableHead className="text-center font-medium">Role</TableHead>
                        <TableHead className="text-center font-medium">Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                                <span className='font-medium'>
                                    No Company Found
                                </span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map(job => (
                            <TableRow key={job._id}>
                                <TableCell className="text-center font-medium">
                                    {job?.company?.name || "-"}
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {job?.title || job?.position || "-"}
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {job.createdAt?.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-center flex justify-center items-center">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="end"
                                            side="bottom"
                                            sideOffset={8}
                                            className="w-35 p-2 border-0 bg-white"
                                        >
                                            <div
                                                onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                                            >
                                                <Edit size={18} />
                                                <span>Edit</span>
                                            </div>

                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/appplicants`)}
                                                className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100">
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>

                                            <div
                                                onClick={(() =>
                                                    handleDelete(job._id))}
                                                className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100">
                                                <Trash2Icon size={18}/>
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
