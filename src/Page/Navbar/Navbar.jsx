import { Avatar } from "@mui/material";
import React from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { task, auth } = useSelector((store) => store);
  return (
    <div className="container z-10 sticky left-0 right-0 top-0 py-1 px-5 lg:px-10 flex justify-between items-center">
      <p className="font-bold text-lg">Li Task Management</p>
      <div className="flex items-center gap-5">
        <p>{auth.user?.fullName}</p>
        <Avatar src="https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png">
          Li
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
