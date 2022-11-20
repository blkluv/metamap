import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Event } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";
import UserContext from "../../context/userContext";
import { Box, Button, CardMedia } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import preview from "../../images/preview.png";

const EventHeader = ({
  _id,
  title,
  start,
  location,
  description,
  participants,
}: Event) => {
  const { selectedEvent, onSetSelectedEvent, onJoinEvent, onLeaveEvent } =
    useContext(EventContext);
  const { currentUser } = useContext(UserContext);

  const ifJoined = participants?.find(
    (user) => user._id === currentUser?.user._id
  );

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
      selected={_id === selectedEvent?._id}
      onClick={() => onSetSelectedEvent?.(_id)}
    >
      <CardMedia
        component="img"
        sx={{
          width: 155,
          borderRadius: "10px",
          marginRight: "1rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        image={preview}
        alt="Marker on the map"
      />
      <ListItemText
        primary={
          <Typography
            sx={{ display: "block" }}
            component="span"
            variant="body2"
            color="white"
            fontSize={"1.5rem"}
          >
            {title}
          </Typography>
        }
        secondary={
          <>
            <Typography
              sx={{ display: "block", marginTop: "0.2rem" }}
              component="span"
              variant="body2"
              color="white"
            >
              {start + " — " + location}
            </Typography>
            <Typography
              sx={{
                display: "block",
                color: "white",
                margin: "0.5rem 0 0.8rem 0",
              }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ display: "flex", color: "white" }}
                component="div"
                variant="body2"
              >
                <GroupIcon />
                <Typography component="div" sx={{ margin: "0 1rem 0 0.3rem" }}>
                  {participants?.length}
                </Typography>
              </Typography>
              <Button
                onClick={() =>
                  ifJoined ? onLeaveEvent?.(_id) : onJoinEvent?.(_id)
                }
                sx={{
                  color: ifJoined ? "rgb(235, 110, 105)" : "",
                  paddingLeft: 0,
                }}
              >
                {ifJoined ? (
                  <CloseIcon fontSize="small" />
                ) : (
                  <CheckIcon fontSize="small" />
                )}
                {ifJoined ? "Leave" : "Join"}
              </Button>
            </Box>
          </>
        }
      />
    </ListItem>
  );
};

export default EventHeader;
