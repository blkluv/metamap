import WorldMap from "./components/WorldMap/WorldMap";
import SignIn from "./components/SignIn/SignIn";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Signup/SignUp";
import ResponsiveAppBar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Grid container>
        <ResponsiveAppBar />
        <Grid item xs={12} md={4}>
          <Routes>
            <Route path="/" element={<Box>Homepage</Box>} />
            <Route path="events" element={<Box>Events</Box>} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </Grid>
        <Grid item xs={12} md={8}>
          <WorldMap />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
