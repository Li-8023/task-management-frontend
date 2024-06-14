import { createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api"

export const fetchTasks = createAsyncThunk("task/fetchTasks", 
    async({status}) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try{
            const {data} = await api.get("/api/tasks", {
                params: {status}
            });
            console.log("fetch tasks: ", data);
            return data;
        }catch(error){
            console.log("Failed to fetch tasks", error);
            throw Error(error.response.data.error)
        }
    }
)


export const fetchUsersTasks = createAsyncThunk(
  "task/fetchUsersTasks",
  async ({ status }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.get("/api/tasks/user", {
        params: { status },
      });
      console.log("fetch users tasks: ", data);
      return data;
    } catch (error) {
      console.log("Failed to fetch tasks", error);
      throw Error(error.response.data.error);
    }
  }
);

export const fetchTasksById = createAsyncThunk(
  "task/fetchTasksById",
  async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.get(`/api/tasks/getTask/${taskId}`);
      console.log("fetch tasks by id: ", data);
      return data;
    } catch (error) {
      console.log("Failed to fetch tasks", error);
      throw Error(error.response.data.error);
    }
  }
);

export const createTask = createAsyncThunk("task/createTask", async ({ taskData }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);

  try {
    const { data } = await api.post(
      `/api/tasks/createTask`,
      taskData
    );
    console.log("created task: ", data);
    return data;
  } catch (error) {
    console.log("Failed to fetch tasks", error);
    throw Error(error.response.data.error);
  }
});

export const updateTask = createAsyncThunk("task/updateTask", async ({ id, updatedTaskData }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);

  try {
    const { data } = await api.put(
      `/api/tasks/updateTask/${id}`,
      updatedTaskData
    );
    console.log("updated task: ", data);
    return data;
  } catch (error) {
    console.log("Failed to fetch tasks", error);
    throw Error(error.response.data.error);
  }
});

export const assignTaskToUser = createAsyncThunk(
  "task/assignTaskToUser",
  async ({taskId, userId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.put(
        `/api/tasks/assignTaskToUser/${taskId}/user/${userId}`
      );
      console.log("assigned task: ", data);
      return data;
    } catch (error) {
      console.log("Failed to fetch tasks", error);
      throw Error(error.response.data.error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ taskId}) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.delete(`/api/tasks/deleteTask/${taskId}`);
      console.log("task delete successfully");
      return taskId;

    } catch (error) {
      console.log("Failed to fetch tasks", error);
      throw Error(error.response.data.error);
    }
  }
);

//task slice
const taskSlice = createSlice({
    name:"task",
    initialState:{
        tasks:[],
        loading: false,
        error:null,
        taskDetails: null,
        usersTask:[]
    },

    reducer:{},
    extraReducers:(builder) => {
        builder
          .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
          })
          .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          .addCase(fetchUsersTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUsersTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.usersTask = action.payload;
          })
          .addCase(fetchUsersTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          .addCase(createTask.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks.push(action.payload);
          })
          .addCase(createTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          .addCase(updateTask.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks = state.tasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
          })

          .addCase(assignTaskToUser.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks = state.tasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
          })

          .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            
          })
    },
});

export default taskSlice.reducer;

