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
