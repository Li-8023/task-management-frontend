import { darkTheme } from "./theme/darktheme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./Page/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Auth from "./Page/Auth/Auth";
import { useState } from "react";

function App() {
  const user  = true;

  return (
    <ThemeProvider theme={darkTheme}>
      {/* Ensure the baseline CSS styles are applied */}
      <CssBaseline />
      {user ? (
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
