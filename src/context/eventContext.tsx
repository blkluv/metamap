import { useState, useEffect, createContext, useContext } from "react";
import { Event, EventsContext } from "../utils/interfaces";
import EventService from "../services/eventService";
import UserContext from "./userContext";
import CommunicationContext from "./communicationContext";

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
  const { currentUser } = useContext(UserContext);
  const { socket, onAddNotification, onSendNotification, dataUpdate } =
    useContext(CommunicationContext);

  const getEvents = async () => {
    const events = await EventService.getEvents();
    if (events) {
      setEvents(events);
    }
  };

  const handleAddEvent = async (event: Event) => {
    const newEvent = await EventService.addEvent(event);
    if (newEvent) {
      const updateReceivers = currentUser?.followers;
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new event.",
            read: false,
            type: "event",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            senderId: newEvent.creator?._id,
            senderName: newEvent.creator?.name,
            receiverId: follower._id,
            text: "created a new event.",
            type: "event",
          });
          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      setEvents((events) => [newEvent, ...events]);
    }
  };

  const handleJoinEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.joinEvent(id);
    if (updatedEvent) {
      let notification = {
        receiverId: updatedEvent.creator?._id,
        text: "joined your event.",
        read: false,
        type: "event",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        receiverId: updatedEvent.creator?._id,
        text: "joined your event.",
        type: "event",
      });

      const updateReceivers = currentUser?.followers;
      // @ts-ignore
      updateReceivers?.push(updatedEvent.creator);
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      setSelectedEvent(updatedEvent);
      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(updatedEvents);
    }
  };

  const handleLeaveEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.leaveEvent(id);
    if (updatedEvent) {
      setSelectedEvent(updatedEvent);
      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );

      const updateReceivers = currentUser?.followers;
      // @ts-ignore
      updateReceivers?.push(updatedEvent.creator);
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }
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

  const handleRateEvent = async (id: string | undefined, rating: number) => {
    const updatedEvent = await EventService.rateEvent(id, rating);
    if (updatedEvent) {
      let notification = {
        receiverId: updatedEvent.creator?._id,
        text: "rated your event.",
        read: false,
        type: "event",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        receiverId: updatedEvent.creator?._id,
        text: "rated your event.",
        type: "event",
      });

      const updateReceivers = currentUser?.followers;
      // @ts-ignore
      updateReceivers?.push(updatedEvent.creator);
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          console.log("event updated rating");
          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      const updatedEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(updatedEvents);
      setSelectedEvent(updatedEvent);
    }
  };

  const handleDeleteEvent = async (id: string | undefined) => {
    const deletedEvent = await EventService.deleteEvent(id);
    if (!deletedEvent) {
      const updatedEvents = events.filter((event) => event._id !== id);
      setEvents(updatedEvents);
      setSelectedEvent(undefined);

      const updateReceivers = currentUser?.followers;
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }
    }
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      getEvents();
    }
  }, [currentUser]);

  useEffect(() => {
    dataUpdate && getEvents?.();
  }, [dataUpdate]);

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        onGetEvents: getEvents,
        onJoinEvent: handleJoinEvent,
        onLeaveEvent: handleLeaveEvent,
        onAddEvent: handleAddEvent,
        onRateEvent: handleRateEvent,
        onSetSelectedEvent: handleSetSelectedEvent,
        onRemoveSelectedEvent: handleRemoveSelectedEvent,
        onDeleteEvent: handleDeleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
