import { useContext } from "react";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ResponsiveAppBar from "./AppBar";
import ThemeContext from "../../context/themeContext";

const TopNavbar = () => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: palette?.background.secondary,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "250px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PublicIcon
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
            color: "white",
          }}
        />
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: ".1rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          GeoEvents
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          background: palette?.background.primary,
        }}
      >
        <ResponsiveAppBar />
      </Box>
    </Box>
  );
};

export default TopNavbar;
