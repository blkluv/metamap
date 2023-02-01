import { useContext, useEffect, useState, useRef } from "react";
import EventContext from "../../context/eventContext";
import { Box } from "@mui/material";
import EventMenu from "../Navigation/EventMenu";
import EventsList from "./EventsList";
import { Event } from "../../utils/interfaces";
import BusinessContext from "../../context/businessContext";

const Events = () => {
  const { events, selectedEvent, onRemoveSelectedEvent } =
    useContext(EventContext);
  const { selectedBusiness, onRemoveSelectedBusiness } =
    useContext(BusinessContext);
  const [filteredItems, setFilteredItems] = useState(null);
  const eventMenuRef = useRef();

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

  useEffect(() => {
    if (selectedEvent || selectedBusiness) {
      onRemoveSelectedEvent?.();
      onRemoveSelectedBusiness?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

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
        overflow: "scroll",
      }}
    >
      <EventMenu
        items={events}
        handleFilter={handleFilter}
        scrollRef={eventMenuRef}
      />
      <EventsList
        items={filteredItems ? filteredItems : events}
        scrollRef={eventMenuRef}
      />
    </Box>
  );
};

export default Events;
