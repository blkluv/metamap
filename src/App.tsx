import { useEffect, useState } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Signup/SignUp";
import EventHeaderList from "./components/Events/EventHeaderList";
import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import EventContext from "./context/eventContext";
import EventService from "./services/eventService";
import { Toaster } from "react-hot-toast";
import { Event } from "./utils/interfaces";

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  const getEvents = async () => {
    const events = await EventService.getEvents();
    if (events) {
      setEvents(events);
    }
  };

  const handleAddEvent = async (event: Event) => {
    const newEvent = await EventService.addEvent(event);
    if (newEvent) {
      setEvents((events) => [...events, newEvent]);
    }
  };

  const handleSetSelectedEvent = (id: string | undefined) => {
    if (id === selectedEvent?._id) {
      setSelectedEvent(undefined);
    } else {
      const selected = events.find((event) => event._id === id);
      setSelectedEvent(selected);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <EventContext.Provider
        value={{
          events,
          selectedEvent,
          onAddEvent: handleAddEvent,
          onSetSelectedEvent: handleSetSelectedEvent,
        }}
      >
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
        <Toaster />
      </EventContext.Provider>
    </>
  );
};

export default App;
