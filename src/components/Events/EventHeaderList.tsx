import { useContext } from "react";
import List from "@mui/material/List";
import EventHeader from "./EventHeader";
import { Event } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";

const EventHeaderList = () => {
  const { events } = useContext(EventContext);

  return (
    <>
      {events.length === 0 && <p>No events to display.</p>}
      {events.length > 0 && (
        <List
          sx={{
            width: "100%",
            height: "92vh",
            bgcolor: "background.paper",
            overflow: "scroll",
          }}
        >
          {events.map((event: Event) => (
            <EventHeader key={event._id} {...event} />
          ))}
        </List>
      )}
    </>
  );
};

export default EventHeaderList;
