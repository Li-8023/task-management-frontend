import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserList from "../../TaskList/UserList";
import SubmissionList from "../../TaskList/SubmissionList";
import EditTaskForm from "../../TaskList/EditTaskCard";

const role="ROLE_ADMIN";

function TaskCard(){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [openUserList, setOpenUserList] = useState(false);

  const handleOpenUserList = () =>{
    setOpenUserList(true);
    handleMenuClose();
  };

  const handleCloseUserList = () =>{
    setOpenUserList(false);
  }

  const [openSubmissionList, setOpenSubmissionList] = useState(false);

  const handleOpenSubmissionList = () => {
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
  };

  const [openTaskEditForm, setOpenTaskEditForm] = useState(false);

  const handleOpenUpdateTaskModel = () => {
    setOpenTaskEditForm(true);
    handleMenuClose();
  };

  const handleCloseUpdateTaskModel = () => {
    setOpenTaskEditForm(false);
  };

  const handleDeleteTask = () => {
    handleMenuClose();
  };

  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div className="">
            <img
              className="lg:w-[7rem] lg:h=[7rem] object-cover"
              src="https://cdn.pixabay.com/photo/2022/05/25/21/28/burger-7221436_1280.jpg"
              alt="task image"
            ></img>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">Burger Ordering Website</h1>
              <p className="text-gray-500 text-sm">
                Use latest frameworks adn technologies to develop this website
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm">
              {[1, 1, 1, 1].map((item) => (
                <span className="py-1 px-5 rounded-full techStack">
                  Angular
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {role === "ROLE_ADMIN" ? (
              <>
                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submission
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </>
            ) : (
              <></>
            )}
          </Menu>
        </div>
      </div>
      {openUserList && (
        <UserList open={openUserList} handleClose={handleCloseUserList} />
      )}
      {openSubmissionList && (
        <SubmissionList
          open={openSubmissionList}
          handleClose={handleCloseSubmissionList}
        />
      )}
      {openTaskEditForm && (
        <EditTaskForm
          open={openTaskEditForm}
          handleClose={handleCloseUpdateTaskModel}
        />
      )}
    </div>
  );
}

export default TaskCard;
