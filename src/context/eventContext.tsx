import { useState, useEffect, createContext } from "react";
import { EventsContext } from "../utils/interfaces";
import EventService from "../services/eventService";
import { Event } from "../utils/interfaces";

const INITIAL_STATE: EventsContext = {
  events: [],
};

EventService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth") as string).token
    }`;
  }
  return req;
});

const EventContext = createContext(INITIAL_STATE);

export const EventProvider = ({ children }: React.PropsWithChildren) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  const getEvents = async () => {
    const events = await EventService.getEvents();
    if (events) {
      setEvents(events);
    }
  };

  const handleAddEvent = async (event: Event) => {
    const newEvent = await EventService.addEvent(event);
    if (newEvent) {
      setEvents((events) => [...events, newEvent]);
    }
  };

  const handleSetSelectedEvent = (id: string | undefined) => {
    if (id === selectedEvent?._id) {
      setSelectedEvent(undefined);
    } else {
      const selected = events.find((event) => event._id === id);
      setSelectedEvent(selected);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        onAddEvent: handleAddEvent,
        onSetSelectedEvent: handleSetSelectedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
