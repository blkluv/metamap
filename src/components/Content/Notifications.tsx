import { useContext } from "react";
import ThemeContext from "../../context/themeContext";
import CommunicationContext from "../../context/communicationContext";
import { Box, List, Typography } from "@mui/material";
import { Notification } from "../../utils/interfaces";
import NotificationHeader from "./NotificationHeader";

const Notifications = () => {
  const { notifications } = useContext(CommunicationContext);
  const { palette } = useContext(ThemeContext);

  const visibleNotifications = notifications.filter(
    (notification) => !notification.silent
  );

  return (
    <Box
      sx={{
        borderRadius: "25px",
        background: palette?.background.primary,
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1.5rem",
        alignItems: "flex-start",
        width: { xs: "100%", md: "40%" },
        height: "fit-content",
        border: `1px solid ${palette?.background.tertiary}`,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: ".5rem",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
          color={palette?.text.tertiary}
          fontSize={".7rem"}
        >
          Notifications
        </Typography>
        {visibleNotifications.length > 0 ? (
          <List sx={{ overflow: "scroll" }}>
            {visibleNotifications.map((notification: Notification) => (
              <NotificationHeader
                key={notification._id}
                notification={notification}
              />
            ))}
          </List>
        ) : (
          <Typography
            sx={{
              color: palette?.text.tertiary,
              textTransform: "uppercase",
              marginBottom: ".5rem",
              fontSize: ".7rem",
            }}
          >
            Clear
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Notifications;
