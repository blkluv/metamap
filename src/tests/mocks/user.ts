import { rest } from "msw";
import { BASE_URL } from "../../api/api";
import { User } from "../../utils/interfaces";

export const testUser: User = {
  _id: "testUserId",
  name: "testUser",
  email: "testUser@email.com",
  following: [],
  followers: [],
  description: "Test description.",
  newsletter: false,
  avatar: "",
};

export const userEndpoints = [
  rest.post(`${BASE_URL}/users/signup`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ user: testUser, token: "testusertoken" })
    );
  }),

  rest.post(`${BASE_URL}/users/signin`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ user: testUser, token: "testusertoken" })
    );
  }),

  rest.patch(`${BASE_URL}/users/update`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testUser,
        name: "testUserUpdated",
      })
    );
  }),

  rest.patch(
    `${BASE_URL}/users/follow/testUserToFollowId`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          activeUser: {
            ...testUser,
            following: [
              { _id: "testUserToFollowId", name: "testUserToFollow" },
            ],
          },
        }),
        ctx.delay(150)
      );
    }
  ),
];
