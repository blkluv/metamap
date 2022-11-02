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
      sx={{ cursor: "pointer" }}
      selected={_id === selectedEvent?._id}
      onClick={() => onSetSelectedEvent?.(_id)}
    >
      <ListItemAvatar>
        <Avatar alt={title} src={logo} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {start + " — " + location}
            </Typography>
            <Typography
              sx={{ display: "block" }}
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
