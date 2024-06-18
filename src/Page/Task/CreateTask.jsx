import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { createTask } from "../../ReduxToolkit/TaskSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const tags = ["Angular", "React", "Vue", "Spring boot", "Node js", "Python"];

export default function CreateNewTaskForm({ handleClose, open }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
  };

  const handleDeadlineChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  // const formatDate=(input) => {
  //     let {
  //         $y:year,
  //         $M: month,
  //         $D: day,
  //         $H: hours,
  //         $m: minutes,
  //         $s: seconds,
  //         $ms: milliseconds
  //     } = input;
  //     const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

  //     const formatedDate = date.toISOString();
  //     return formatedDate;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDeadline = formData.deadline.toISOString();
    const dataToSubmit = {
      ...formData,
      deadline: formattedDeadline,
      tags: selectedTags,
    };

    try {
      await dispatch(createTask({ taskData: dataToSubmit })).unwrap();
      console.log("Task created successfully");
      handleClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image"
                  fullWidth
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="multiple-limit-tags"
                  options={tags}
                  onChange={handleTagsChange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField label="Tags" fullWidth {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    onChange={handleDeadlineChange}
                    label="Deadline"
                    className="w-full"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{ padding: ".9rem" }}
                  className="customButton"
                  type="submit"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
