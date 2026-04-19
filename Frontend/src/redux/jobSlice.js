import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        filterQuery: "",
        totalJobs : []
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        removeAdminJob: (state, action) => {
            state.allAdminJobs = state.allAdminJobs.filter(
                job => job._id !== action.payload
            );
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setTotalJobs: (state, action) => {
            state.totalJobs = action.payload;
        }
    }
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery,setTotalJobs,removeAdminJob} = jobSlice.actions;
export default jobSlice.reducer;