import { rest } from "msw";
import { BASE_URL } from "../../api/api";
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

export const eventsEndpoints = [
  rest.get(`${BASE_URL}/events`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.post(`${BASE_URL}/events`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testEvent));
  }),

  rest.delete(`${BASE_URL}/events/testEventId`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testEvent));
  }),

  rest.patch(`${BASE_URL}/events/rate/testEventId`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testEvent,
        rating: {
          rates: [{ _id: "testUserId2", rating: 3 }],
          ratesNumber: 1,
          average: 3,
        },
      })
    );
  }),

  rest.patch(`${BASE_URL}/events/join/testEventId`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testEvent,
        participants: [{ _id: "testUserId", name: "testUser" }],
      })
    );
  }),
];
