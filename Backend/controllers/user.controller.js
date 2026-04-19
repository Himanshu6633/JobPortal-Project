import { User } from "../models/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv"
dotenv.config();

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname?.trim() ||
            !email?.trim() ||
            !phoneNumber?.trim() ||
            !password ||
            !role) {
            return res.status(400).json({
                message: "Something went Wrong !!",
                success: false
            })
        }
        const file = req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: "auto" })
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email !!",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        })
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production" // secure:true in production (requires HTTPS)
            })
            .json({
                message: `Register successfull ${user.fullname}`,
                success: true,
                user
            })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        }
        )
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something went Wrong !!",
                success: false
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User doesn't exist!!",
                success: false
            })
        }
        let isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Email or Password !!",
                success: false
            })
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exists with current role",
                success: false
            })
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production" // secure:true in production (requires HTTPS)
            })

            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                user
            })
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong !!",
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logout successfully",
                success: true,
            })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong !!",
            success: false
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        let cloudResponse;
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto",
            folder: "resumes",
        });

        const userId = req.id // middleware authentication
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // updating data 

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) {
            const skillsArray = Array.isArray(skills)
                ? skills
                : skills.split(",").map(skill => skill.trim()).filter(Boolean);
            user.profile.skills = skillsArray;
        }

        // Resume comes here later....
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            user
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong !!",
            success: false
        })
    }
}


//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file;

//         const userId = req.id;
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false
//             });
//         }

//         // ---------- Update basic fields ----------
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;

//         if (skills) {
//             user.profile.skills = Array.isArray(skills)
//                 ? skills
//                 : skills.split(",").map(s => s.trim()).filter(Boolean);
//         }

//         // ---------- Resume Upload (PDF ONLY) ----------
//         if (file) {
//             const fileUri = getDataUri(file);

//             const cloudResponse = await cloudinary.uploader.upload(
//                 fileUri.content,
//                 {
//                     folder: "resumes",
//                     resource_type: "raw" // ✅ REQUIRED FOR PDF
//                 }
//             );

//             user.profile.resume = {
//                 public_id: cloudResponse.public_id,
//                 format: cloudResponse.format // "pdf"
//             };

//             user.profile.resumeOriginalName = file.originalname;
//         }

//         await user.save();

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             success: true,
//             user: {
//                 _id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 role: user.role,
//                 profile: user.profile
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Something went wrong",
//             success: false
//         });
//     }
// };
