import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Body = () => {
  const { user } = useSelector((store) => store.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { 
      navigate("/login");
    }
  }, [user, navigate]); // ✅ Add dependencies

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Body;
