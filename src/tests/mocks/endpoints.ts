import { rest } from "msw";
import { BASE_URL } from "../../api/api";
import { testUser } from "./user";
import { testComment, testPost, testPost2 } from "./post";

export const endpoints = [
  // users
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

  // posts
  rest.get(`${BASE_URL}/posts/user/testUserToFollow`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([testPost2]));
  }),

  rest.get(`${BASE_URL}/posts/following`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([testPost2]));
  }),

  rest.post(`${BASE_URL}/posts`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testPost));
  }),

  rest.delete(`${BASE_URL}/posts/testPostId`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ _id: "testPostId" }));
  }),

  rest.patch(`${BASE_URL}/posts/like/testPostId2`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testPost2,
        likes: [{ _id: "testUserId", name: "testUser" }],
      })
    );
  }),

  // posts - comments
  rest.patch(`${BASE_URL}/posts/comment/testPostId2`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testPost2,
        comments: [{ ...testComment }],
      })
    );
  }),

  rest.patch(
    `${BASE_URL}/posts/comment/testPostId2/testCommentId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(testPost2));
    }
  ),

  rest.patch(
    `${BASE_URL}/posts/comment/like/testPostId2/testCommentId`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...testPost2,
          comments: [
            {
              ...testComment,
              likes: [{ _id: "testUserId", name: "testUser" }],
            },
          ],
        })
      );
    }
  ),

  rest.patch(
    `${BASE_URL}/posts/comment/dislike/testPostId2/testCommentId`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...testPost2,
          comments: [{ ...testComment }],
        })
      );
    }
  ),
];
