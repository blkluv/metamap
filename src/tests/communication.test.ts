import { cleanup } from "@testing-library/react";
import {
  addConversation,
  addMessage,
  addNotification,
  deleteConversation,
  deleteNotification,
  getConversations,
  getMessages,
  getNotifications,
  getUserMessages,
  readMessage,
  readNotification,
  setArrivalNotification,
  setCurrentConversation,
  setOnlineUsers,
} from "../store/communication";
import {
  testConversation,
  testMessage,
  testNotification,
} from "./mocks/communication";

import { setupStore } from "./utils/setStore";

describe("MESSAGES: get / add / read", () => {
  let store: any;

  beforeAll(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const communication = () => store.getState().communication.data;

  test("User should not get any messages from a particular conversation.", async () => {
    await store.dispatch(getMessages("testConversationId"));

    expect(communication().messages).toEqual([]);
  });

  test("There should be a message addressed to the user.", async () => {
    await store.dispatch(getUserMessages("testUserId"));

    expect(communication().userMessages[0].receiver._id).toEqual(
      testMessage.receiver?._id
    );
  });

  test("User should be able to read a message.", async () => {
    expect(communication().userMessages[0].read).toEqual(false);

    await store.dispatch(readMessage("testMessageId"));

    expect(communication().userMessages[0].read).toEqual(true);
  });

  test("User should be able to add a message.", async () => {
    await store.dispatch(addMessage(testMessage));

    expect(communication().messages[0].receiver._id).toEqual("testUserId");
  });
});

describe("NOTIFICATIONS: get / add / read / delete", () => {
  let store: any;

  beforeAll(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const communication = () => store.getState().communication.data;

  test("A notification should be delivered to another user.", async () => {
    expect(store.getState().communication.status).toEqual(null);

    await store.dispatch(addNotification(testNotification));

    expect(store.getState().communication.status).toEqual("success");
  });

  test("There should be no notifications for the current user.", async () => {
    await store.dispatch(getNotifications("testUserId"));

    expect(communication().notifications).toEqual([]);
  });

  test("User should be able to read a notification.", async () => {
    await store.dispatch(setArrivalNotification(testNotification));

    expect(communication().notifications[0].read).toEqual(false);

    await store.dispatch(readNotification("testNotificationId"));

    expect(communication().notifications[0].read).toEqual(true);
  });

  test("User should be able to delete notification.", async () => {
    await store.dispatch(deleteNotification("testNotificationId"));

    expect(communication().notifications).toEqual([]);
  });
});

describe("CONVERSATIONS: get / add / delete / online status", () => {
  let store: any;

  beforeAll(async () => {
    store = setupStore({});
  });

  afterAll(() => {
    cleanup();
  });

  const communication = () => store.getState().communication.data;

  test("There should be no conversations available", async () => {
    await store.dispatch(getConversations("testUserId"));

    expect(communication().conversations).toEqual([]);
  });

  test("User should be able to add a conversation", async () => {
    await store.dispatch(addConversation(testConversation));

    expect(communication().conversations).toEqual([testConversation]);
  });

  test("User should be able to delete a conversation", async () => {
    await store.dispatch(deleteConversation("testConversationId"));

    expect(communication().conversations).toEqual([]);
  });

  test("User should be able to set current conversation", async () => {
    expect(communication().currentConversation).toEqual(null);

    await store.dispatch(setCurrentConversation("testConversationId"));

    expect(communication().currentConversation).toEqual("testConversationId");
  });

  test("User should be able to be online (chat)", async () => {
    expect(communication().onlineUsers).toEqual([]);

    await store.dispatch(setOnlineUsers(["testUserId"]));

    expect(communication().onlineUsers).toEqual(["testUserId"]);
  });
});
