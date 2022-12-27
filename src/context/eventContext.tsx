import { useState, useEffect, createContext } from "react";
import { Event, EventsContext } from "../utils/interfaces";
import EventService from "../services/eventService";

const INITIAL_STATE: EventsContext = {
  events: [],
};

EventService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
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
      setEvents((events) => [newEvent, ...events]);
    }
  };

  const handleJoinEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.joinEvent(id);
    if (updatedEvent) {
      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );

      setEvents(updatedEvents);
    }
  };

  const handleLeaveEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.leaveEvent(id);
    if (updatedEvent) {
      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );

      setEvents(updatedEvents);
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

  const handleRemoveSelectedEvent = () => {
    setSelectedEvent(undefined);
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      getEvents();
    }
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        onGetEvents: getEvents,
        onJoinEvent: handleJoinEvent,
        onLeaveEvent: handleLeaveEvent,
        onAddEvent: handleAddEvent,
        onSetSelectedEvent: handleSetSelectedEvent,
        onRemoveSelectedEvent: handleRemoveSelectedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
