import { Box } from "@mui/material";
import NotificationIcon from "../../Content/NotificationIcon";
import MessageIcon from "../../Elements/MessageIcon";

interface BlockProps {
  mobile?: boolean;
}

const NotificationsBlock = ({ mobile }: BlockProps) => {
  return (
    <Box
      sx={{
        display: mobile
          ? { xs: "flex", md: "none" }
          : { xs: "none", md: "flex" },
        justifyContent: mobile ? "space-evenly" : "",
      }}
    >
      <MessageIcon />
      <NotificationIcon />
    </Box>
  );
};

export default NotificationsBlock;
