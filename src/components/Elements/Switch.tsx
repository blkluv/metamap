import { useContext } from "react";
import ThemeContext from "../../context/themeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box } from "@mui/material";

const Toggler = () => {
  const { palette, theme, onChangeTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{ paddingLeft: { xs: "0.8rem", md: 0 } }}
      onClick={() => onChangeTheme?.()}
    >
      {theme === "light" ? (
        <DarkModeIcon
          sx={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: palette?.text.tertiary,
          }}
        />
      ) : (
        <LightModeIcon
          sx={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "yellow",
          }}
        />
      )}
    </Box>
  );
};

export default Toggler;
