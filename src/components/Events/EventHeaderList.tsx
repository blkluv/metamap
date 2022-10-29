import { useContext } from "react";
import List from "@mui/material/List";
import EventHeader from "./EventHeader";
import { Event } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";
import { CircularProgress } from "@mui/material";

const EventHeaderList = () => {
  const events = useContext(EventContext);

  return (
    <>
      {!events ? (
        <CircularProgress />
      ) : (
        <List
          sx={{
            width: "100%",
            height: "92vh",
            bgcolor: "background.paper",
            overflow: "scroll",
          }}
        >
          {events.data.map((event: Event) => (
            <EventHeader key={event._id} {...event} />
          ))}
        </List>
      )}
    </>
  );
};

export default EventHeaderList;
