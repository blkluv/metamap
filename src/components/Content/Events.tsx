import { useContext } from "react";
import List from "@mui/material/List";
import EventHeader from "./EventHeader";
import { Event } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";
import { Box, Divider } from "@mui/material";
import EventMenu from "../Navigation/EventMenu";
import ThemeContext from "../../context/themeContext";

const Events = () => {
  const { events } = useContext(EventContext);
  const { palette } = useContext(ThemeContext);

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
        sx={{ background: "rgb(120,120,126)", margin: "1rem 0 1.5rem 0" }}
      />
      {events.length > 0 ? (
        <List
          sx={{
            width: "100%",
            background: palette?.background.primary,
            color: "white",
            padding: 0,
            marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
            overflow: "scroll",
          }}
        >
          {events.map((event: Event) => (
            <EventHeader key={event._id} variant={"list"} event={event} />
          ))}
        </List>
      ) : (
        <p>No events to display.</p>
      )}
    </Box>
  );
};

export default Events;
