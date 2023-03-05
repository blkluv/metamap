import { rest } from "msw";
import { BASE_URL } from "../../api/api";
import { Business } from "../../utils/interfaces";

export const testBusiness: Business = {
  phone: "123",
  email: "123",
  website: "123",
  _id: "testBusinessId",
  type: "test",
  name: "test",
  category: "test",
  address: "test",
  openingtime: "test",
  contact: {
    phone: "123",
    email: "123",
    website: "123",
  },
  coordinates: { lng: 1, lat: 2 },
  description: "",
  logo: "",
  likes: [],
  rating: {
    rates: [{ _id: "testUserId", rating: 5 }],
    ratesNumber: 0,
    average: 0,
  },
  creator: {
    _id: "testUserId",
    name: "testUser",
  },
  owners: [
    {
      _id: "testUserId",
      name: "testUser",
    },
  ],
  comments: [],
};

export const businessesEndpoints = [
  rest.get(`${BASE_URL}/businesses`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.post(`${BASE_URL}/businesses`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testBusiness));
  }),

  rest.patch(`${BASE_URL}/businesses/like/testBusinessId`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testBusiness,
        likes: [{ _id: "testUserId", name: "testUser" }],
      })
    );
  }),

  rest.patch(`${BASE_URL}/businesses/rate/testBusinessId`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testBusiness,
        rating: {
          rates: [{ _id: "testUserId", rating: 3 }],
          ratesNumber: 1,
          average: 3,
        },
      })
    );
  }),

  rest.delete(`${BASE_URL}/businesses/testBusinessId`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testBusiness));
  }),
];
