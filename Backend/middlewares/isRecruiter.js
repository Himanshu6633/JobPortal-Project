import {User}  from "../models/userModel.js";

const isRecruiter = async (req, res, next) => {
    try {
        // Check if user ID exists on request
        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login."
            });
        }

        // Find user by ID
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Check recruiter role
        if (user.role !== "recruiter") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Recruiters only."
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export default isRecruiter