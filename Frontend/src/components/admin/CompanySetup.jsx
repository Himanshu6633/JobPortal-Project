import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import useGetCompanyById from '@/hooks/useGetCompanyById'

// import { setLoading } from '@/redux/authSlice'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    // console.log("hello")
    const navigate = useNavigate()
    const { id } = useParams()
    const {singleCompany} = useSelector(store=>store.company)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const [loading, setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log("SUBMIT CLICKED");
        setLoading(true)

        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) formData.append("file", input.file)

        try {
            const res = await axios.put(
                `${COMPANY_API_ENDPOINT}/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            // console.log("RESPONSE:", res.data);
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
         if (!singleCompany) return;

        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null
        })
    }, [singleCompany]);

    return (
        <div>
            <Navbar />

            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center justify-between gap-5 p-8">
                        <Button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-800 bg-gray-100 font-medium"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </Button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className={"font-medium text-gray-700 mb-2"}>Company Name</Label>
                            <Input className={"font-medium "} name="name" value={input.name} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label className={"font-medium  text-gray-700 mb-2"}>Description</Label>
                            <Input className={"font-medium"} name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label className={"font-medium text-gray-700 mb-2"}>Website</Label>
                            <Input className={"font-medium"} name="website" value={input.website} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label className={"font-medium text-gray-700 mb-2"}>Location</Label>
                            <Input className={"font-medium "} name="location" value={input.location} onChange={changeEventHandler} />
                        </div>

                        <div className="col-span-2">
                            <Label className={"font-medium text-gray-700 mb-2"}>Company Logo</Label>
                            <Input className={"font-medium"} type="file" accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="w-full mt-8">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-8 bg-blue-950 text-white">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
