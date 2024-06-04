import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar.css";
import CreateNewTaskForm from "../Task/CreateTask";
import { useLocation } from "react-router-dom";

const menu = [
  { name: "Home", value: "HOME", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "", role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] },
];

const role = "ROLE_ADMIN";

const Sidebar = () => {
  const location = useLocation();

  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };
  const handleOpenCreateTaskForm = () => {
    setOpenCreateTaskForm(true);
  };

  const [activeMenu, setActiveMenu] = useState("Home");

  const handleMenuChange = (item) => {
    if (item.name == "Create New Task") {
      handleOpenCreateTaskForm();
    }
    else if(item.name == "Home"){
      
    }
    setActiveMenu(item.name);
  };
  const handleLogOut = () => {
    console.log("user logged out");
  };

  return (
    <>
      <div className=" card min-h-[87vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-4 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-[#c24dd0]"
              src="https://cdn.pixabay.com/photo/2023/04/12/12/02/cute-7920120_1280.jpg"
            />
          </div>
          {menu
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <p
                onClick={() => handleMenuChange(item)}
                className={`py-2 px-5 rounded-full text-center cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                }`}
              >
                {item.name}
              </p>
            ))}

          <Button
            onClick={() => handleLogOut()}
            sx={{ padding: ".4rem", borderRadius: "2rem" }}
            fullWidth
            className="logoutButton"
          >
            logout
          </Button>
        </div>
      </div>
      <CreateNewTaskForm open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm}/>
    </>
  );
};

export default Sidebar;
