import { useCallback, useEffect, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import {
  UserHeader as Header,
  User,
  ReduxState,
} from "../../../utils/interfaces";
import { Avatar, Box } from "@mui/material";
import { People } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/users";
import Follow from "./Follow";

const UserHeader = (user: Header) => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [avatar, setAvatar] = useState<any>(null);

  const ifFollowing = (currentuser: User | null, id: string) => {
    if (currentUser) {
      return currentuser?.following?.find((user) => user._id === id);
    }
    return null;
  };

  const getAvatar = useCallback(async (id: string) => {
    const user = await getUser(id);
    return setAvatar(user?.avatar);
  }, []);

  useEffect(() => {
    getAvatar(user.name);
  }, [getAvatar, user.name]);

  return (
    <ListItem
      sx={{
        borderRadius: "25px",
        background: palette.background.tertiary,
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        minHeight: "80px",
        justifyContent: "space-between",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        "&:last-child": {
          marginBottom: "2.5rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to={`/dashboard/profile/${user.name}`}
          style={{ textDecoration: "none" }}
        >
          <Avatar
            alt="User avatar"
            src={avatar}
            sx={{
              margin: "0 .5rem .2rem 0",
              height: "2.2rem",
              width: "2.2rem",
              cursor: "pointer",
              alignSelf: "center",
            }}
          />
        </NavLink>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NavLink
            to={`/dashboard/profile/${user.name}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{ display: "block", cursor: "pointer" }}
              component="span"
              variant="body2"
              color={palette.text.tertiary}
              fontSize={".9rem"}
            >
              {user.name}
            </Typography>
          </NavLink>
          {ifFollowing(currentUser, user._id) ? (
            <People
              sx={{
                width: "1.5rem",
                fontSize: "1rem",
                color: palette.text.tertiary,
              }}
            />
          ) : null}
        </Box>
      </Box>
      <Follow user={user} />
    </ListItem>
  );
};

const MemoizedUserHeader = memo(UserHeader);

export default MemoizedUserHeader;
