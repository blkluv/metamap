import { useContext } from "react";
import List from "@mui/material/List";
import EventHeader from "./EventHeader";
import { Event, EventsListProps } from "../../utils/interfaces";
import ThemeContext from "../../context/themeContext";

const EventsList = ({ items }: EventsListProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <>
      {items.length > 0 ? (
        <List
          sx={{
            width: "100%",
            background: palette?.background.primary,
            color: "white",
            padding: 1,
            marginBottom: { xs: "0", md: "-5rem", lg: "-3rem" },
            overflow: "scroll",
          }}
        >
          {items.map((event: Event) => (
            <EventHeader key={event._id} variant={"list"} event={event} />
          ))}
        </List>
      ) : (
        <p>No events to display.</p>
      )}
    </>
  );
};

export default EventsList;
