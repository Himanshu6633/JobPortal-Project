import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/admin/protectedRoute"
import EditJob from "./components/admin/EditJob"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/jobs",
    element: <Jobs/>
  },
  {
    path: "/description/:id",
    element: <JobDescription/>
  },
  {
    path: "/browse",
    element: <Browse/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },

    // Admin ki liye routes 
  {
    path: "/admin/companies",
    element: <ProtectedRoute allowedRoles={["recruiter"]}><Companies/></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute allowedRoles={["recruiter"]}><CreateCompany/></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute allowedRoles={["recruiter"]}><CompanySetup/></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element:<ProtectedRoute allowedRoles={["recruiter"]}><AdminJobs/></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element:<ProtectedRoute allowedRoles={["recruiter"]}><PostJob/></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/:id/appplicants",
    element:<ProtectedRoute allowedRoles={["recruiter"]}><Applicants/></ProtectedRoute> 
  },
  {
    path: "/admin/jobs/edit/:id",
    element:<ProtectedRoute allowedRoles={["recruiter"]}><EditJob/></ProtectedRoute> 
  },

])
function App() {
  return (
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App