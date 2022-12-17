import { useContext } from "react";
import { Box } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import WorldMap from "../WorldMap/WorldMap";
import Content from "./Content";

const ContentWindow = () => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        padding: { xs: "1rem", md: "1rem 2rem 2rem 2rem", overflow: "hidden" },
        background: palette?.background.primary,
        gridGap: "2rem",
        height: "auto",
      }}
    >
      <Content />
      <WorldMap />
    </Box>
  );
};

export default ContentWindow;
