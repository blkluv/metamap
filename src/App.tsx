import WorldMap from "./components/WorldMap/WorldMap";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Signup/SignUp";
import EventHeaderList from "./components/Events/EventHeaderList";
import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import EventContext from "./context/eventContext";
import useFetch from "./hooks/useFetch";

const App = () => {
  const data = useFetch(
    "https://geoevents-api-production.up.railway.app/events"
  );

  return (
    <>
      <EventContext.Provider value={data}>
        <CssBaseline />
        <Grid container>
          <ResponsiveAppBar />
          <Grid item xs={12} md={4}>
            <Routes>
              <Route path="/" element={<Box>Homepage</Box>} />
              <Route path="events" element={<EventHeaderList />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>
          </Grid>
          <Grid item xs={12} md={8}>
            <WorldMap />
          </Grid>
        </Grid>
      </EventContext.Provider>
    </>
  );
};

export default App;
