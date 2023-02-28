import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ResponsiveAppBar from "./AppBar";
import { ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";

const TopNavbar = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: palette.background.secondary,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          minWidth: "220px",
          maxWidth: "220px",
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
          background: palette.background.primary,
        }}
      >
        <ResponsiveAppBar />
      </Box>
    </Box>
  );
};

export default TopNavbar;
