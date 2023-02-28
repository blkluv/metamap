import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import usersReducer from "./users";
import eventsReducer from "./events";
import businessesReducer from "./businesses";
import postsReducer from "./posts";
import themeReducer from "./theme";
import communicationReducer from "./communication";

export default combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer,
  events: eventsReducer,
  businesses: businessesReducer,
  posts: postsReducer,
  communication: communicationReducer,
  theme: themeReducer,
});
