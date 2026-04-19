import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector((store) => store.jobs);

    return (
        <div>
            <Table>
                <TableCaption className="text-gray-500">
                    List of your Applied Jobs
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center text-gray-500 font-medium"
                            >
                                You haven't applied to any job yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="font-medium">
                                <TableCell>
                                    {appliedJob.createdAt?.split("T")[0]}
                                </TableCell>

                                <TableCell>
                                    {appliedJob?.job?.title || "NA"}
                                </TableCell>

                                <TableCell>
                                    {appliedJob?.job?.company?.name || "NA"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Badge
                                        className={`py-1 px-2 text-white font-bold ${appliedJob.status === "pending"
                                                ? "bg-gray-500"
                                                : appliedJob.status === "rejected"
                                                    ? "bg-red-600"
                                                    : appliedJob.status === "accepted"
                                                        ? "bg-green-600"
                                                        : "bg-blue-900"
                                            }`}
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
