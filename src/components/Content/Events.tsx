import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import EventMenu from "../Navigation/EventMenu";
import EventsList from "./EventsList";
import { Event, ReduxState } from "../../utils/interfaces";
import { getEvents } from "../../store/events";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { removeSelectedBusiness } from "../../store/businesses";
import { removeSelectedEvent } from "../../store/events";

const Events = () => {
  const [filteredItems, setFilteredItems] = useState(null);
  const {
    data: { events },
    status,
  } = useSelector((state: ReduxState) => state.events);
  const { selectedBusiness } = useSelector(
    (state: ReduxState) => state.businesses.data
  );
  const { selectedEvent } = useSelector(
    (state: ReduxState) => state.events.data
  );
  const dispatch = useAppDispatch();
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
      dispatch(removeSelectedEvent());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  useEffect(() => {
    if (selectedEvent || selectedBusiness) {
      dispatch(removeSelectedEvent());
      dispatch(removeSelectedBusiness());
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

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

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
        loading={status}
        items={filteredItems ? filteredItems : events}
        scrollRef={eventMenuRef}
      />
    </Box>
  );
};

export default Events;
