import { useEffect } from "react";
import { Badge } from "@mui/material";
import { styled } from "@mui/system";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../../utils/interfaces";
import { getUserMessages } from "../../store/communication";
import { useAppDispatch } from "../../store/store";

const MessageIcon = () => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { userMessages } = useSelector(
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
    dispatch(getUserMessages?.(currentUser?._id));
  }, [currentUser?._id, dispatch]);

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
