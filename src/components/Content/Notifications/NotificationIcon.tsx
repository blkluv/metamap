import { useEffect } from "react";
import { Badge } from "@mui/material";
import { styled } from "@mui/system";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";
import { getNotifications } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const NotificationIcon = () => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { notifications } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const dispatch = useAppDispatch();

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: palette.warning,
      color: "white",
      WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    },
  }));

  useEffect(() => {
    dispatch(getNotifications(currentUser._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentUser ? (
        <NavLink
          to={`/dashboard`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <StyledBadge
            badgeContent={
              notifications.filter(
                (notification) => !notification.read && !notification.silent
              ).length
            }
            overlap="circular"
            sx={{
              marginRight: { xs: "1rem", md: "2rem" },
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
