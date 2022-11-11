import { createContext } from "react";
import { UsersContext } from "../utils/interfaces";

const INITIAL_STATE: UsersContext = {
  currentUser: null,
};

const UserContext = createContext(INITIAL_STATE);

export default UserContext;
