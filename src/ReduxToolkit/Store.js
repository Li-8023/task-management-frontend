import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import taskReducer from "./TaskSlice";
import submissionReducer from "./SubmissionSlice";

// Reducer 的作用是管理应用状态的变化。它是一个纯函数，负责根据当前状态和接收到的 action 生成并返回新的状态
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  submission: submissionReducer,
});

// 配置 redux store
const store = configureStore({
  reducer: rootReducer,
  // No need to add redux-thunk as it is included by default
  // If you want to add other middleware, you can do it like this:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* your other middleware */)
});

export default store;
