import { Event } from "../../utils/interfaces";

export const testEvent: Event = {
  _id: "testEventId",
  type: "education",
  name: "testEvent",
  title: "testEvent",
  start: "testStart",
  end: "testEnd",
  category: "education",
  location: "testLocation",
  coordinates: { lng: 1, lat: 1 },
  description: "testDescription",
  comments: [],
  logo: "",
  creator: {
    _id: "testUserId",
    name: "testUser",
  },
  participants: [],
  rating: {
    rates: [{ _id: "testUserId", rating: 5 }],
    ratesNumber: 0,
    average: 0,
  },
};
