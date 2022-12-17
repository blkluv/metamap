import { useContext } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ThemeContext from "../../context/themeContext";

const Profile = () => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "2rem 1rem", md: "0 2rem" },
        background: palette?.background.primary,
        color: palette?.text.primary,
      }}
    >
      <Box
        sx={{
          height: "100%",
          minHeight: { xs: "600px", md: "600px" },
          maxHeight: { xs: "250vh", md: "85vh" },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Profile;
