import { useRef } from "react";
import { Box, List, Typography } from "@mui/material";
import { Notification, ReduxState } from "../../utils/interfaces";
import NotificationHeader from "./NotificationHeader";
import ScrollToTheTop from "../Elements/ScrollToTheTop";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { notifications } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const headerRef = useRef();

  const visibleNotifications = notifications.filter(
    (notification) => !notification.silent
  );

  return (
    <Box
      sx={{
        borderRadius: "25px",
        background: palette.background.primary,
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1.5rem",
        alignItems: "flex-start",
        width: { xs: "100%", md: "45%" },
        height: "fit-content",
        border: `1px solid ${palette.background.tertiary}`,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        maxHeight: "85vh",
        overflow: "scroll",
      }}
    >
      <Box ref={headerRef} sx={{ marginBottom: ".5rem" }}></Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: "0",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
          color={palette.text.tertiary}
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
            <ScrollToTheTop
              minLength={10}
              data={visibleNotifications}
              scrollRef={headerRef}
            />
          </List>
        ) : (
          <Typography
            sx={{
              color: palette.text.tertiary,
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
