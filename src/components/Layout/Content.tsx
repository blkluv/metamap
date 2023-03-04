import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Businesses from "../Content/Business/Businesses";
import Feed from "../Content/User/Feed";
import Events from "../Content/Event/Events";
import Social from "../Content/Social/Social";

const Content = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: { xs: "100%", md: "55%" },
        minHeight: { xs: "max-content" },
        maxHeight: "85vh",
      }}
    >
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/events" element={<Events />} />
        <Route path="/business" element={<Businesses />} />
        <Route path="/social" element={<Social />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default Content;
