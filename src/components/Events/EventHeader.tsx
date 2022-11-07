import { Fragment, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Event } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";

const EventHeader = ({
  _id,
  title,
  start,
  location,
  description,
  logo,
}: Event) => {
  const { selectedEvent, onSetSelectedEvent } = useContext(EventContext);

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        cursor: "pointer",
        borderRadius: "25px",
        background: "rgb(53,51,64)",
        marginBottom: "1rem",
      }}
      selected={_id === selectedEvent?._id}
      onClick={() => onSetSelectedEvent?.(_id)}
    >
      <ListItemAvatar>
        <Avatar alt={title} src={logo} />
      </ListItemAvatar>
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
          <Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="white"
            >
              {start + " — " + location}
            </Typography>
            <Typography
              sx={{ display: "block", color: "white" }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default EventHeader;
