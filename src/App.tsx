import { useEffect, useState } from "react";
import WorldMap from "./components/WorldMap/WorldMap";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import EventHeaderList from "./components/Events/EventHeaderList";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import EventContext from "./context/eventContext";
import EventService from "./services/eventService";
import UserContext from "./context/userContext";
import UserService from "./services/userService";
import { Toaster } from "react-hot-toast";
import { Event, User } from "./utils/interfaces";
import MenuItemList from "./components/MenuItemList/MenuItemList";
import { EventMenuItems } from "./constants/menuItems";
import Toggler from "./components/Switch/Switch";
import ChangePassword from "./components/Auth/ChangePassword";
import ResetPassword from "./components/Auth/Reset";
import TopNavbar from "./components/TopNavbar/TopNavbar";

const App = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  const handleSignUp = async (user: User) => {
    const currentUser = await UserService.signUp(user);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  const handleSignIn = async (user: User) => {
    const currentUser = await UserService.signIn(user);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  const handleResetPassword = async (email: string) => {
    const currentUser = await UserService.resetPassword(email);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  const handleChangePassword = async (token: string, data: object) => {
    const currentUser = await UserService.changePassword(token, data);
    if (currentUser) {
      setCurrentUser(currentUser);
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
      <UserContext.Provider
        value={{
          currentUser,
          onSignUp: handleSignUp,
          onSignIn: handleSignIn,
          onResetPassword: handleResetPassword,
          onChangePassword: handleChangePassword,
        }}
      >
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
              <TopNavbar />
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
                  width: "243px",
                  height: "auto",
                  justifyContent: "space-between",
                  padding: "1.5rem",
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
                  padding: { xs: "1rem", md: "1rem 2rem 2rem 2rem" },
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
                    <Route path="resetpassword" element={<ResetPassword />} />
                    <Route path="changepassword" element={<ChangePassword />} />
                  </Routes>
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "45%" },
                    minHeight: { xs: "90vh", md: "600px" },
                    maxHeight: "fit-content",
                    background: "rgb(36,35,48)",
                    // margin: "-1rem",
                  }}
                >
                  <WorldMap />
                </Box>
              </Box>
            </Box>
          </Box>
          <Toaster />
        </EventContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
