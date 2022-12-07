import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Events from "../Content/Events";
import Feed from "../Content/Feed";
import Social from "../Content/Social";

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
        <Route path="/" element={<Feed />} />
        <Route path="/events" element={<Events />} />
        <Route path="/places" element={<h1>Places</h1>} />
        <Route path="/social" element={<Social />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default Content;
