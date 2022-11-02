import { createContext } from "react";
import { EventsContext } from "../utils/interfaces";

const INITIAL_STATE: EventsContext = {
  events: [],
};

const EventContext = createContext(INITIAL_STATE);

export default EventContext;
