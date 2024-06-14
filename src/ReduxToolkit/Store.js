import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./AuthSlice";
import taskReducer from "./TaskSlice";
import submissionReducer from "./SubmissionSlice";


//reducer 的作用是管理应用状态的变化。它是一个纯函数，负责根据当前状态和接收到的 action 生成并返回新的状态
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  submission: submissionReducer,
});

//配置redux store
const store=configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(thunk)
})

export default store;