import { createContext } from "react";
import { Events } from "../utils/interfaces";

const INITIAL_STATE: Events = {
  data: [],
  isLoading: false,
  error: false,
};

const EventContext = createContext(INITIAL_STATE);

export default EventContext;
