import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const submitTask = createAsyncThunk("submissions/submitTask", 
    async({taskId, githubLink}) => {
        setAuthHeader(localStorage.getItem("jwt"), api);

        try{
            const { data } = await api.post(`/api/submission/submitTask?task_id=${taskId}&github_link=${githubLink}`, {});
            console.log("submitted task: ", data);
            return data;
        }catch(error){
            console.log("error: ", error);
            throw Error(error.response.data.error);
        }
    }
)

export const fetchAllSubmission = createAsyncThunk(
  "submissions/fetchAllSubmission",
  async () => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.get(
        `/api/submission/getAllSubmissions`
      );
      console.log("get all submissions: ", data);
      return data;
    } catch (error) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const fetchSubmissionsByTaskId = createAsyncThunk(
  "submissions/fetchSubmissionsByTaskId",
  async ({taskId}) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.get(
        `/api/submission/getAllSubmissionsForTaskId/${taskId}`
      );
      console.log("get submissions by id: ", data);
      return data;
    } catch (error) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const acceptDeclineSubmission = createAsyncThunk(
  "submissions/acceptDeclineSubmission",
  async ({id, status}) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.put(
        `/api/submission/acceptOrDecline/${id}?status=${status}`
      );
      console.log("accept or decline task: ", data);
      return data;
    } catch (error) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

const submissionSlice = createSlice({
    name:"submission",
    initialState:{
        submissions:[],
        status: '',
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(submitTask.pending, (state) => {
            state.status = "loading";
          })
          .addCase(submitTask.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.submissions.push(action.payload);
          })
          .addCase(submitTask.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })

          .addCase(fetchAllSubmission.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.submissions = action.payload;
          })
          .addCase(fetchAllSubmission.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })

          .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.submissions = action.payload;
          })

          .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.submissions = state.submissions.map((item) => item.id !== action.payload.id ? item : action.payload);
          });
         
    },
});

export default submissionSlice.reducer;