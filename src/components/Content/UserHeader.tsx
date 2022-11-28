import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { UserHeader as Header, User } from "../../utils/interfaces";
import { Avatar, Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
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
      alignItems="flex-start"
      sx={{
        cursor: "pointer",
        borderRadius: "25px",
        background: "rgb(53,51,64)",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      onClick={() => {}}
    >
      <Avatar
        alt={name}
        src="/static/images/avatar/1.jpg"
        sx={{
          marginRight: "1rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
      />
      <ListItemText
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        primary={
          <>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="white"
              fontSize={"1rem"}
            >
              {name}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="rgb(120,120,126)"
            >
              username
            </Typography>
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
                    : "",
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
