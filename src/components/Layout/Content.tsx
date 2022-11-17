import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import EventHeaderList from "../Content/EventHeaderList";
import Account from "../Pages/Account";

const Content = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: { xs: "100%", md: "55%" },
        minHeight: { xs: "600px", md: "600px" },
        maxHeight: "85vh",
      }}
    >
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/events" element={<EventHeaderList />} />
        <Route path="/places" element={<h1>Places</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default Content;
