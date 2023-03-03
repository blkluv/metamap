import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";

interface LogoProps {
  color: string;
  fontSize: string;
  mobile?: boolean;
}

const WebsiteLogo = ({ color, fontSize, mobile }: LogoProps) => {
  return (
    <Box
      sx={{
        display: mobile
          ? { xs: "flex", md: "none" }
          : { xs: "none", md: "flex" },
        minWidth: "220px",
        maxWidth: "220px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PublicIcon
        sx={{
          mr: 1,
          color,
        }}
      />
      <Link
        component={RouterLink}
        to="/dashboard"
        color="primary"
        sx={{
          mr: 2,
          fontWeight: 700,
          fontSize,
          letterSpacing: ".1rem",
          color,
          textDecoration: "none",
        }}
      >
        GeoEvents
      </Link>
    </Box>
  );
};

export default WebsiteLogo;
