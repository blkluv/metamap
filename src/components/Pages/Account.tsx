import { useContext } from "react";
import { Box, Divider, Typography } from "@mui/material";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";

const Account = () => {
  const { onDeleteUser } = useContext(UserContext);
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
      <Box sx={{ padding: "8px" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Account
        </Typography>
        <Divider
          variant="middle"
          sx={{ background: palette?.divider, margin: "1rem 0 1.5rem 0" }}
        />
        <button onClick={() => onDeleteUser?.()}>Delete account</button>
      </Box>
    </Box>
  );
};

export default Account;
