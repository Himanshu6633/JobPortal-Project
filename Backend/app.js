import express from "express";
import cors from "cors";
import mongoose from 'mongoose'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js"

import userRouter from "./Routes/user.routes.js"
import companyRouter from "./Routes/company.routes.js"
import jobRouter from "./Routes/job.routes.js"
import applicantRouter from "./Routes/applicant.routes.js"


dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/user",userRouter)
app.use("/company",companyRouter)
app.use("/job",jobRouter)
app.use("/applicant",applicantRouter)

                                      // index route 
app.get("/",(req,res)=>{
  res.send("server is working no need to worry")
})


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});


