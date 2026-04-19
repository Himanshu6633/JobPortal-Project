import React, { useEffect, useState } from 'react'
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies = [],searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    // console.log(companies)

    useEffect(() => {
    if (!searchCompanyByText) {
        setFilterCompany(companies);
        return;
    }

    const filtered = companies.filter(company =>company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()));

    setFilterCompany(filtered);
}, [companies, searchCompanyByText]);


    return (
        <div>
            <Table>
                <TableCaption className={'font-medium'}>
                    A list of your recently registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow className="bg-blue-50">
                        <TableHead className="text-center font-medium">Logo</TableHead>
                        <TableHead className="text-center font-medium">Name</TableHead>
                        <TableHead className="text-center font-medium">Date</TableHead>
                        <TableHead className="text-center font-medium">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                                <span className='font-medium'>
                                    No Company Found
                                </span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map(company => (
                            <TableRow key={company._id}>
                                <TableCell className="flex justify-center">
                                    <Avatar>
                                        <AvatarImage
                                            src={company.logo || "https://via.placeholder.com/40"}
                                            className="object-contain"
                                            alt={company.name}
                                        />
                                    </Avatar>
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {company.name}
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {company.createdAt?.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-center flex justify-center items-center">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-20 h-8 flex items-center justify-center border-0 border-transparent relative left-15 bottom-8 ">
                                            
                                            <div onClick={()=>{
                                                navigate(`/admin/companies/${company._id}`)
                                            }} className="flex items-center gap-2 cursor-pointer">
                                                <Edit size={20} />
                                                <span>Edit</span>
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

export default CompaniesTable
