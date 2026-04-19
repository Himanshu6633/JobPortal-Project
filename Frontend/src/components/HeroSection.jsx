import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        if (!query.trim()) return; // ignore empty search
        dispatch(setSearchedQuery(query.trim().toLowerCase()));
        setQuery("");
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1  Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span>
                </h1>
                <p className='font-medium text-gray-500'>From browsing jobs to landing your next role, we make your career journey simple and rewarding.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find Your Dream Jobs'
                        className='outline-none border-none w-full'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") searchJobHandler();
                        }}
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]" onClick={searchJobHandler}>
                        <Search className="h-5 w-5 text-white"></Search>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection

// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchKeyword } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = () => {
//     if (!query.trim()) return;
//     dispatch(setSearchKeyword(query.trim()));
//     navigate("/browse");
//   };

//   return (
//     <div className="text-center">
//       <div className="flex flex-col gap-5 my-10">
//         <h1 className="text-5xl font-bold">
//           Search & Get Your <span className="text-[#6A38C2]">Dream Job</span>
//         </h1>

//         <div className="flex w-[40%] mx-auto border rounded-full px-3">
//           <input
//             className="w-full outline-none"
//             placeholder="Search jobs..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
//           />
//           <Button onClick={searchJobHandler}>
//             <Search />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
