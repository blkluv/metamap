import { AnyAction, combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import usersReducer from "./users";
import eventsReducer from "./events";
import businessesReducer from "./businesses";
import postsReducer from "./posts";
import themeReducer from "./theme";
import communicationReducer from "./communication";
import { ReduxState } from "../utils/interfaces";

const allReducers = combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer,
  events: eventsReducer,
  businesses: businessesReducer,
  posts: postsReducer,
  communication: communicationReducer,
  theme: themeReducer,
});

const rootReducer = (state: ReduxState | undefined, action: AnyAction) => {
  if (action.type === "currentUser/logout") {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
