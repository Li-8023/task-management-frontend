import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserList from "../../TaskList/UserList";
import SubmissionList from "../../TaskList/SubmissionList";
import EditTaskForm from "../../TaskList/EditTaskCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../ReduxToolkit/TaskSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SubmissionFormModel from "../SubmissionFormModel";

const role="ROLE_ADMIN";

function TaskCard({item}){
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const {auth} = useSelector(store=>store);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [openUserList, setOpenUserList] = useState(false);

  const handleOpenUserList = () =>{
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenUserList(true);
    handleMenuClose();
  };

  const handleCloseUserList = () =>{
    setOpenUserList(false);
  }

  const [openSubmissionList, setOpenSubmissionList] = useState(false);

  const handleOpenSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
  };

  const [openSubmissionFormModel, setOpenSubmissionFormModel] = useState(false);
  const handleOpenSubmitFormModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    setOpenSubmissionFormModel(true);
    handleMenuClose();

  };
  const handleCloseSubmitFormModel = () =>{
    setOpenSubmissionFormModel(false);
  }

  const [openTaskEditForm, setOpenTaskEditForm] = useState(false);

  // const handleRemoveTaskIdParams = ()=>{
  //   const updatedParams = new URLSearchParams(location.search);
  //   updatedParams.delete("taskId");
  //   const queryString = updatedParams.toString();
  //   const updatedPath = queryString
  //     ? `${location.pathname}?${queryString}`
  //     : location.pathname;
  //   navigate(updatedPath);
  // }
  const handleOpenUpdateTaskModel = () => {
    const updatedParams = new URLSearchParams(location.search)
    setOpenTaskEditForm(true);
    updatedParams.set("taskId", item.id);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
    handleMenuClose();
  };

  const handleCloseUpdateTaskModel = () => {
    setOpenTaskEditForm(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask({ taskId: item.id })); 
    handleMenuClose();
  };

  

  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div className="">
            <img
              className="lg:w-[7rem] lg:h=[7rem] object-cover"
              src={item.image}
              alt="task image"
            ></img>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{item.title}</h1>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm">
              {item.tags.map((item) => (
                <span className="py-1 px-5 rounded-full techStack">{item}</span>
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
            {auth.user?.role === "ROLE_ADMIN" ? (
              <>
                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  See Submission
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
              </>
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
          item={item}
          open={openTaskEditForm}
          handleClose={handleCloseUpdateTaskModel}
        />
      )}
      {openSubmissionFormModel && (
        <SubmissionFormModel open={openSubmissionFormModel} handleClose={handleCloseSubmitFormModel}/>
      )}
    </div>
  );
}

export default TaskCard;
