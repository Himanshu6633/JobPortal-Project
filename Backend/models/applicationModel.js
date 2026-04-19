import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Job',
        required: true
    },
    applicant: {
       type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    status: {
        type: String,
        enum : ['pending','rejected','accepted'],
        default : 'pending'
    }
},
    { timestamps: true }
);
applicationSchema.index(
  { job: 1, applicant: 1 },
  { unique: true }
);

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema)