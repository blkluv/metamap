import { setupServer } from "msw/node";
import { businessesEndpoints } from "./business";
import { communicationEndpoints } from "./communication";
import { eventsEndpoints } from "./event";
import { postsEndpoints } from "./post";
import { userEndpoints } from "./user";

export const server = setupServer(
  ...userEndpoints,
  ...businessesEndpoints,
  ...postsEndpoints,
  ...eventsEndpoints,
  ...communicationEndpoints
);
