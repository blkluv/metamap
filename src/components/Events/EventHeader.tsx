import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Event } from "../../utils/interfaces";

const EventHeader = ({ title, date, location, description, logo }: Event) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={title} src={logo} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {date + " — " + location}
            </Typography>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default EventHeader;
