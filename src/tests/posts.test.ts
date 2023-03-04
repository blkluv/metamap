import { cleanup } from "@testing-library/react";
import {
  addComment,
  addPost,
  deletePost,
  dislikeComment,
  getFollowingPosts,
  getUserPosts,
  likeComment,
  likePost,
} from "../store/posts";
import { setupStore } from "./utils/setStore";
import { testComment, testPost, testPost2 } from "./mocks/post";

describe("POSTS: get / add / comment / like / delete", () => {
  let store: any;

  beforeAll(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const posts = () => store.getState().posts.data;

  test("There should be one post available from the user he follows.", async () => {
    await store.dispatch(getUserPosts("testUserToFollow"));

    expect(posts().userPosts).toEqual([testPost2]);
  });

  test("User should be able to add a post.", async () => {
    await store.dispatch(addPost(testPost));

    expect(posts().followingPosts).toEqual([testPost]);
  });

  test("User should be able to like someone's post.", async () => {
    await store.dispatch(likePost(testPost2._id));

    expect(posts().userPosts[0].likes[0]).toEqual({
      _id: "testUserId",
      name: "testUser",
    });
  });

  test("User should be able to delete it's post.", async () => {
    await store.dispatch(deletePost("testPostId"));

    expect(posts().followingPosts).toEqual([]);
  });

  test("Commenting posts should be available.", async () => {
    await store.dispatch(
      addComment({ postId: "testPostId2", comment: testComment })
    );

    expect(posts().userPosts[0].comments[0]._id).toEqual("testCommentId");
  });

  test("User should be available to like a comment.", async () => {
    await store.dispatch(
      likeComment({ postId: "testPostId2", commentId: "testCommentId" })
    );

    expect(posts().userPosts[0].comments[0].likes[0]).toEqual({
      _id: "testUserId",
      name: "testUser",
    });
  });

  test("User should be available to dislike a comment.", async () => {
    await store.dispatch(
      dislikeComment({ postId: "testPostId2", commentId: "testCommentId" })
    );

    expect(posts().userPosts[0].comments[0].likes).toEqual([]);
  });

  test("One following post should be available for the user.", async () => {
    await store.dispatch(getFollowingPosts());

    expect(posts().followingPosts[0]._id).toEqual("testPostId2");
  });
});
