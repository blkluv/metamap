import { Box } from "@mui/material";
import WorldMap from "../WorldMap/WorldMap";
import Content from "./Content";

const ContentWindow = () => {
  return (
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
      <Content />
      <WorldMap />
    </Box>
  );
};

export default ContentWindow;
