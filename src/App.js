import { darkTheme } from "./theme/darktheme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./Page/Navbar/Navbar"; 
import Home from "./Page/Home/Home";
import Auth from "./Page/Auth/Auth";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* Ensure the baseline CSS styles are applied */}
      <CssBaseline />
        {/* <Navbar />
        <Home /> */}
        <Auth />
    </ThemeProvider>
  );
}

export default App;
