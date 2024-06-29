import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";


const AllRoutes = () => {
  return <>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Placeholder for your Signup component */}
            {/* <Route path="/login"  element={}  /> */}
        </Routes>

  
  </>;
};
export default AllRoutes;
