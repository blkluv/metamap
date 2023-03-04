import { Box } from "@mui/material";
import WorldMap from "../WorldMap/WorldMap";
import Sponsored from "../Content/Sponsored";
import Content from "./Content";
import { Route, Routes } from "react-router-dom";
import { ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";
import Notifications from "../Content/Notifications/Notifications";

const ContentWindow = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        padding: {
          xs: "1rem",
          md: "1rem 2rem 1.5rem 2rem",
          overflow: "hidden",
        },
        background: palette.background.primary,
        gridGap: "2rem",
        height: "auto",
      }}
    >
      <Content />
      <Routes>
        <Route path="/*" element={<WorldMap />} />
        <Route path="/social" element={<Sponsored />} />
        <Route path="/" element={<Notifications />} />
      </Routes>
    </Box>
  );
};

export default ContentWindow;
