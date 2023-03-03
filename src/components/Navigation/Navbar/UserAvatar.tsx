import { useMemo } from "react";
import { Avatar, IconButton, Tooltip, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import {
  ChatMessage,
  Notification,
  ReduxState,
} from "../../../utils/interfaces";
import styled from "@emotion/styled";

interface UserAvatarProps {
  openMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}

const UserAvatar = ({ openMenu }: UserAvatarProps) => {
  const { avatar } = useSelector((state: ReduxState) => state.currentUser.data);
  const { userMessages, notifications } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: palette.warning,
      color: "white",
      WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    },
  }));

  const filterNotifications = (
    notifications: Notification[],
    messages: ChatMessage[]
  ) => {
    const visibleNotifications = notifications.filter(
      (notification: Notification) => !notification.silent && !notification.read
    );
    const unreadMessages = messages.filter(
      (message: ChatMessage) => !message.read
    );
    return [...visibleNotifications, ...unreadMessages].length;
  };

  const memoizedFilterNotifications = useMemo(
    () => filterNotifications(notifications, userMessages),
    [notifications, userMessages]
  );

  return (
    <Tooltip title="Settings">
      <IconButton onClick={openMenu} sx={{ p: 0 }}>
        <StyledBadge
          badgeContent={memoizedFilterNotifications}
          overlap="circular"
          sx={{
            display: { xs: "flex", md: "none" },
            marginRight: "1rem",
            height: "1.6rem",
            width: "1.6rem",
            cursor: "pointer",
            alignSelf: "center",
          }}
        >
          <Avatar
            alt="User avatar"
            src={avatar}
            sx={{
              display: { xs: "flex", md: "none" },
              height: { xs: "1.8rem", md: "2rem" },
              width: { xs: "1.8rem", md: "2rem" },
              WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            }}
          />
        </StyledBadge>
        <Avatar
          alt="User avatar"
          src={avatar}
          sx={{
            display: { xs: "none", md: "flex" },
            height: { xs: "1.8rem", md: "2rem" },
            width: { xs: "1.8rem", md: "2rem" },
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default UserAvatar;
