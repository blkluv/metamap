import { useContext, useEffect } from "react";
import { Badge } from "@mui/material";
import { styled } from "@mui/system";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CommunicationContext from "../../context/communicationContext";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import { NavLink } from "react-router-dom";

const NotificationIcon = () => {
  const { currentUser } = useContext(UserContext);
  const { notifications, onGetNotifications } =
    useContext(CommunicationContext);
  const { palette } = useContext(ThemeContext);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: palette?.warning,
      color: "white",
      WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    },
  }));

  useEffect(() => {
    onGetNotifications?.(currentUser?._id);
  }, [currentUser?._id, onGetNotifications]);

  return (
    <>
      {currentUser ? (
        <NavLink
          to={`/dashboard`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <StyledBadge
            badgeContent={
              notifications.filter((notification) => !notification.read).length
            }
            overlap="circular"
            sx={{
              marginRight: "2rem",
              height: "1.6rem",
              width: "1.6rem",
              cursor: "pointer",
              alignSelf: "center",
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: "1.6rem" }} />
          </StyledBadge>
        </NavLink>
      ) : null}
    </>
  );
};

export default NotificationIcon;
