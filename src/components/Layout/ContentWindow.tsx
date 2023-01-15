import { useContext } from "react";
import { Box } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import WorldMap from "../WorldMap/WorldMap";
import Sponsored from "../Content/Sponsored";
import Notifications from "../Content/Notifications";
import Content from "./Content";
import { Route, Routes } from "react-router-dom";

const ContentWindow = () => {
  const { palette } = useContext(ThemeContext);

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
        background: palette?.background.primary,
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
