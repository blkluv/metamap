import { useContext } from "react";
import List from "@mui/material/List";
import EventHeader from "./EventHeader";
import { Event } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";
import { Box, Divider } from "@mui/material";
import EventMenu from "./EventMenu";

const EventHeaderList = () => {
  const { events } = useContext(EventContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <EventMenu />
      <Divider
        variant="middle"
        sx={{ background: "rgb(120,120,126)", margin: "1.5rem 0" }}
      />
      {events.length === 0 && <p>No events to display.</p>}
      {events.length > 0 && (
        <List
          sx={{
            width: "100%",
            background: "rgb(35,35,48)",
            color: "white",
            padding: 0,
            marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
            overflow: "scroll",
          }}
        >
          {events.map((event: Event) => (
            <EventHeader key={event._id} {...event} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default EventHeaderList;
