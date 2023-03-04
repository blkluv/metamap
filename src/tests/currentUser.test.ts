import { cleanup } from "@testing-library/react";
import { followUser, signin, signUp, updateUser } from "../store/currentUser";
import { setupStore } from "./utils/setStore";

describe("USER: signup / signin / follow / update user", () => {
  let store: any;

  beforeEach(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const currentUser = () => store.getState().currentUser.data;

  test("User should be able to signin.", async () => {
    await store.dispatch(signin({ email: "testUser", password: "12345678" }));

    expect(currentUser()._id).toEqual("testUserId");
  });

  test("User should be able to signup.", async () => {
    await store.dispatch(
      signUp({
        username: "testUser",
        email: "testUser@gmail.com",
        password: "12345678",
        external: false,
      })
    );

    expect(currentUser()._id).toEqual("testUserId");
  });

  test("Following users should be possible.", async () => {
    await store.dispatch(followUser("testUserToFollowId"));

    expect(currentUser().following[0]).toEqual({
      _id: "testUserToFollowId",
      name: "testUserToFollow",
    });
  });

  test("User should be allowed to update it's profile.", async () => {
    const update = {
      dataType: "name",
      data: "testUserUpdated",
    };

    expect(currentUser()).toEqual(null);

    await store.dispatch(updateUser(update));

    expect(currentUser().name).toEqual("testUserUpdated");
  });
});
