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
  const { arrivalNotification, onAddNotification, onSendNotification } =
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
      const receivers = currentUser?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new event.",
            silent: false,
            read: false,
            type: "event",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            ...notification,
            senderId: newEvent.creator?._id,
            senderName: newEvent.creator?.name,
            payload: { event: newEvent },
          });
        });
      }

      setEvents((events: Event[]) => [newEvent, ...events]);
    }
  };

  const handleJoinEvent = async (id: string | undefined) => {
    const updatedEvent = await EventService.joinEvent(id);
    if (updatedEvent) {
      let notification = {
        receiverId: updatedEvent.creator?._id,
        text: "joined your event.",
        silent: false,
        read: false,
        type: "event",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        ...notification,
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        payload: { event: updatedEvent },
      });

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
      let notification = {
        receiverId: updatedEvent.creator?._id,
        text: "left your event.",
        silent: true,
        read: false,
        type: "event",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        ...notification,
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        payload: { event: updatedEvent },
      });

      setSelectedEvent(updatedEvent);
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

  const handleRateEvent = async (id: string | undefined, rating: number) => {
    const updatedEvent = await EventService.rateEvent(id, rating);
    if (updatedEvent) {
      let notification = {
        receiverId: updatedEvent.creator?._id,
        text: "rated your event.",
        silent: false,
        read: false,
        type: "event",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        ...notification,
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        payload: { event: updatedEvent },
      });

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
      const receivers = currentUser?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "deleted an event.",
            silent: true,
            read: false,
            type: "eventDeletion",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            ...notification,
            senderId: currentUser?._id,
            senderName: currentUser?.name,
            payload: { _id: id },
          });
        });
      }

      const updatedEvents = events.filter((event) => event._id !== id);
      setEvents(updatedEvents);
      selectedEvent?._id === id && setSelectedEvent(undefined);
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
    if (arrivalNotification?.type === "event") {
      const { event: updatedEvent } = arrivalNotification.payload;

      const existingEvent = events.find(
        (event) => event._id === updatedEvent._id
      );

      if (!existingEvent) {
        setEvents?.([updatedEvent, ...events]);
      } else {
        const updatedEvents = events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        );

        setEvents?.(updatedEvents);
      }

      selectedEvent?._id === updatedEvent._id &&
        setSelectedEvent?.(updatedEvent);
    }

    if (arrivalNotification?.type === "eventDeletion") {
      const { _id } = arrivalNotification.payload;

      const updatedEvents = events.filter((event) => event._id !== _id);

      setEvents?.(updatedEvents);

      selectedEvent?._id === _id && setSelectedEvent?.(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalNotification]);

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        onSetEvents: setEvents,
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
