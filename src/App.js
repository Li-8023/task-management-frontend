import { darkTheme } from "./theme/darktheme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./Page/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Auth from "./Page/Auth/Auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./ReduxToolkit/TaskSlice";
import { getUserProfile } from "./ReduxToolkit/AuthSlice";
import { useTheme } from "@emotion/react";

function App() {
  const user  = true;

    const dispatch = useDispatch();
    const { task, auth } = useSelector((store) => store);

    useEffect(() => {
      dispatch(fetchTasks({}));

      //如果auth里面有jwt，则直接调用jwt，否则在local storage里面取
      dispatch(getUserProfile(auth.jwt || localStorage.getItem('jwt')));
    }, [auth.jwt]);



  return (
    <ThemeProvider theme={darkTheme}>
      {/* Ensure the baseline CSS styles are applied */}
      <CssBaseline />
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;
