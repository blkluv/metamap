import { useContext, useEffect, useState } from "react";
import EventContext from "../../context/eventContext";
import { Box, Divider } from "@mui/material";
import EventMenu from "../Navigation/EventMenu";
import EventsList from "./EventsList";
import { Event } from "../../utils/interfaces";

const Events = () => {
  const { events, selectedEvent, onRemoveSelectedEvent } =
    useContext(EventContext);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    if (filteredItems) {
      setFilteredItems((filteredItems) =>
        // @ts-ignore
        filteredItems.map((item: Event) =>
          item?._id === selectedEvent?._id ? selectedEvent : item
        )
      );
    }
    return () => {
      onRemoveSelectedEvent?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const handleFilter = (data: any) => {
    if (data) {
      setFilteredItems(data);
    } else {
      setFilteredItems(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <EventMenu items={events} handleFilter={handleFilter} />
      <Divider
        variant="middle"
        sx={{ background: "rgb(120,120,126)", margin: "1rem 0 1.5rem 0" }}
      />
      <EventsList items={filteredItems ? filteredItems : events} />
    </Box>
  );
};

export default Events;
