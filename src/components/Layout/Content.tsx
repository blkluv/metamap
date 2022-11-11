import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../Auth/ChangePassword";
import ResetPassword from "../Auth/Reset";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import EventHeaderList from "../Content/EventHeaderList";

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
        <Route path="/" element={<Box>Homepage</Box>} />
        <Route path="events" element={<EventHeaderList />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="changepassword" element={<ChangePassword />} />
      </Routes>
    </Box>
  );
};

export default Content;
