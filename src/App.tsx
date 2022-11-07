import { useEffect, useState } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Signup/SignUp";
import EventHeaderList from "./components/Events/EventHeaderList";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import EventContext from "./context/eventContext";
import EventService from "./services/eventService";
import { Toaster } from "react-hot-toast";
import { Event } from "./utils/interfaces";
import MenuItemList from "./components/MenuItemList/MenuItemList";
import HorizontalMenu from "./components/HorizontalMenu/HorizontalMenu";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { EventMenuItems } from "./constants/menuItems";
import Toggler from "./components/Switch/Switch";

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
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "8fr 92fr",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              background: "rgb(31,30,43)",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "255px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PublicIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "white",
                }}
              />
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                GeoEvents
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                background: "rgb(36,35,48)",
              }}
            >
              <ResponsiveAppBar />
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HorizontalMenu items={EventMenuItems} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              background: "rgb(31,30,43)",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                width: "250px",
                height: "auto",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <MenuItemList items={EventMenuItems} />
              <Toggler />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                padding: "1rem",
                background: "rgb(36,35,48)",
                gridGap: "2rem",
                height: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: { xs: "100%", md: "55%" },
                  minHeight: { xs: "600px", md: "600px" },
                  maxHeight: "85vh",
                }}
              >
                <Routes>
                  <Route path="/" element={<Box>Homepage</Box>} />
                  <Route path="events" element={<EventHeaderList />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="signup" element={<SignUp />} />
                </Routes>
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  minHeight: { xs: "90vh", md: "600px" },
                  maxHeight: "fit-content",
                  background: "rgb(36,35,48)",
                }}
              >
                <WorldMap />
              </Box>
            </Box>
          </Box>
        </Box>
        <Toaster />
      </EventContext.Provider>
    </>
  );
};

export default App;
