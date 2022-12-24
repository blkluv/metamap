import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { UserHeader as Header, User } from "../../utils/interfaces";
import { Avatar, Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import debounce from "../../utils/debounce";

const UserHeader = ({ _id, name }: Header) => {
  const { currentUser, onFollowUser, onGetAvatar } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    getAvatar(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ifFollowing = (currentuser: User | null, id: string) => {
    if (currentUser) {
      return currentuser?.following?.find((user) => user._id === id);
    }
    return null;
  };

  const getAvatar = async (id: any) => {
    const avatar = await onGetAvatar?.(id);
    return setAvatar(avatar);
  };

  return (
    <ListItem
      sx={{
        borderRadius: "25px",
        background: palette?.background.tertiary,
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80px",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <NavLink
        to={`/dashboard/profile/${name}`}
        style={{ textDecoration: "none" }}
      >
        <Avatar
          alt="User avatar"
          src={avatar}
          sx={{
            margin: "0 .5rem .2rem 0",
            height: "2.5rem",
            width: "2.5rem",
            cursor: "pointer",
            alignSelf: "center",
          }}
        />
      </NavLink>
      <ListItemText
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        primary={
          <>
            <NavLink
              to={`/dashboard/profile/${name}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{ display: "block", cursor: "pointer" }}
                component="span"
                variant="body2"
                color={palette?.text.tertiary}
                fontSize={".9rem"}
              >
                {name}
              </Typography>
            </NavLink>
            {ifFollowing(currentUser, _id) ? (
              <PeopleIcon
                sx={{
                  width: "1.5rem",
                  fontSize: "1rem",
                  color: palette?.text.tertiary,
                }}
              />
            ) : null}
          </>
        }
        secondary={
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={debounce(() => onFollowUser?.(_id), 400)}
                sx={{
                  color: ifFollowing(currentUser, _id)
                    ? palette?.warning
                    : "default",
                  borderRadius: "15px",
                }}
              >
                {ifFollowing(currentUser, _id) ? (
                  <CloseIcon fontSize="small" sx={{ width: "1.5rem" }} />
                ) : (
                  <CheckIcon fontSize="small" sx={{ width: "1.5rem" }} />
                )}
                {ifFollowing(currentUser, _id) ? "Unfollow" : "Follow"}
              </Button>
            </Box>
          </>
        }
      />
    </ListItem>
  );
};

export default UserHeader;
