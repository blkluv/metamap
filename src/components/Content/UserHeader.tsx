import { useContext } from "react";
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

const UserHeader = ({ _id, name }: Header) => {
  const { currentUser, onFollowUser } = useContext(UserContext);

  const ifFollowing = (currentuser: User | null, id: string) => {
    if (currentUser) {
      return currentuser?.following?.find((user) => user._id === id);
    }
    return null;
  };

  return (
    <ListItem
      sx={{
        borderRadius: "25px",
        background: "rgb(53,51,64)",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80px",
      }}
    >
      <NavLink
        to={`/dashboard/profile/${name}`}
        style={{ textDecoration: "none" }}
      >
        <Avatar
          alt="User avatar"
          src="/static/images/avatar/1.jpg"
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
                color="white"
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
                  color: "rgb(120,120,126)",
                }}
              />
            ) : null}
          </>
        }
        secondary={
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => onFollowUser?.(_id)}
                sx={{
                  color: ifFollowing(currentUser, _id)
                    ? "rgb(235, 110, 105)"
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
