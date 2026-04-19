import React, { useEffect, useState } from "react"
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter,} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { USER_API_ENDPOINT } from "@/utils/constant"

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: [],
        file: null
    })
    const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await axios.put(
                `${USER_API_ENDPOINT}/profile/update`, formData,
                {
                    withCredentials: true
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);

            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills || [],
                file: user?.profile?.resume || null
            })
        }
    }, [user])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white sm:max-w-106.25" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4 ">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="fullname" className="col-span-3"
                                value={input.fullname}
                                onChange={changeEventHandler} />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input id="email" name="email" className="col-span-3"
                                type={"text"}
                                value={input.email}
                                onChange={changeEventHandler} />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <Input id="number"
                                name="phoneNumber" className="col-span-3"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                type="text" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <Input id="bio" name="bio" className="col-span-3"
                                value={input.bio}
                                onChange={changeEventHandler}
                                type={"text"} />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">
                                Skills
                            </Label>
                            <Input id="skills" name="skills" className="col-span-3"
                                value={input.skills}
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        skills: e.target.value.split(",").map(s => s.trim())
                                    })}
                                type={"text"} />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Resume
                            </Label>
                            <Input
                                type="file"
                                id="file"
                                name="file"
                                className="col-span-3"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading
                                ?
                                <Button disabled className="w-full my-4 bg-blue-900 text-white">
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin " />
                                    Please wait
                                </Button>
                                :
                                <Button type="submit" className='bg-blue-900 w-full my-4 text-white'>Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
