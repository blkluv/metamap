import { useContext } from "react";
import { Box } from "@mui/material";
import ThemeContext from "../../context/themeContext";

const Settings = () => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        padding: { xs: "1rem", md: "1rem 2rem 2rem 2rem", overflow: "hidden" },
        background: palette?.background.primary,
        height: "auto",
        color: palette?.text.tertiary,
      }}
    >
      Settings
    </Box>
  );
};

export default Settings;
