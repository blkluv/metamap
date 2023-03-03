import { Box, Typography } from "@mui/material";
import { UserHeader } from "../../../utils/interfaces";
import Follow from "./Follow";

interface SmallHeaderProps {
  user?: UserHeader;
  mobile?: boolean;
}

const SmallHeader = ({ user, mobile }: SmallHeaderProps) => {
  return (
    <Box
      sx={{
        display: mobile
          ? { sm: "none", md: "block", lg: "none" }
          : { xs: "none", sm: "flex", md: "none", lg: "flex" },
        alignContent: mobile ? "left" : "",
        alignItems: mobile ? "center" : "",
        justifyContent: mobile ? "" : "space-between",
        padding: mobile ? "" : ".5rem .5rem 0 .5rem",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 500,
          fontSize: "1.2rem",
        }}
      >
        {user?.name}
      </Typography>
      <Follow user={user} />
    </Box>
  );
};

export default SmallHeader;
