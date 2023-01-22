import { useContext, useEffect } from "react";
import { Badge } from "@mui/material";
import { styled } from "@mui/system";
import CommunicationContext from "../../context/communicationContext";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { NavLink } from "react-router-dom";

const MessageIcon = () => {
  const { currentUser } = useContext(UserContext);
  const { userMessages, onGetUserMessages } = useContext(CommunicationContext);
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
    onGetUserMessages?.(currentUser?._id);
  }, [currentUser?._id, onGetUserMessages]);

  return (
    <>
      {currentUser ? (
        <NavLink
          to={`/dashboard/chat`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <StyledBadge
            badgeContent={
              userMessages.filter((message) => !message.read).length
            }
            overlap="circular"
            sx={{
              marginRight: "1rem",
              height: "1.6rem",
              width: "1.6rem",
              cursor: "pointer",
              alignSelf: "center",
            }}
          >
            <MailOutlineIcon sx={{ fontSize: "1.6rem" }} />
          </StyledBadge>
        </NavLink>
      ) : null}
    </>
  );
};

export default MessageIcon;
