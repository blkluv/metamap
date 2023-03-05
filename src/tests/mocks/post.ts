import { rest } from "msw";
import { BASE_URL } from "../../api/api";
import { Comment, Post } from "../../utils/interfaces";

export const testComment: Comment = {
  _id: "testCommentId",
  creator: {
    _id: "testUserId",
    name: "testUser",
  },
  likes: [],
  dislikes: [],
  text: "",
  createdAt: "",
};

export const testComment2 = {
  _id: "testCommentId2",
  creator: {
    _id: "testUserId2",
    name: "testUser2",
  },
  likes: [],
  dislikes: [],
  text: "",
  createdAt: "",
};

export const testPost: Post = {
  _id: "testPostId",
  creator: {
    _id: "testUserId",
    name: "testUser",
  },
  description: "",
  comments: [],
  file: "",
  createdAt: "",
  likes: [],
};

export const testPost2 = {
  _id: "testPostId2",
  creator: {
    _id: "testUserId2",
    name: "testUser2",
  },
  description: "",
  comments: [],
  file: "",
  createdAt: "",
  likes: [],
};

export const postsEndpoints = [
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

  // comments
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
