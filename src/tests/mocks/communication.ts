import { rest } from "msw";
import { BASE_URL } from "../../api/api";
import {
  ChatConversation,
  ChatMessage,
  Notification,
} from "../../utils/interfaces";

export const testMessage: ChatMessage = {
  _id: "testMessageId",
  sender: { _id: "testUserId", name: "testUser" },
  receiver: { _id: "testUserId2", name: "testUser2" },
  conversationId: "testConversationId",
  text: "test text",
  read: false,
  createdAt: "testDate",
};

export const testNotification: Notification = {
  _id: "testNotificationId",
  senderId: "testUserId",
  senderName: "testUser",
  receiverId: "receiverId",
  silent: false,
  read: false,
  type: "text",
  text: "text",
  createdAt: "testDate",
  payload: "Hello",
};

export const testConversation: ChatConversation = {
  _id: "testConversationId",
  members: [],
  readOnly: false,
  createdAt: "testDate",
};

export const communicationEndpoints = [
  // messages
  rest.get(
    `${BASE_URL}/communication/messages/testConversationId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }
  ),

  rest.get(
    `${BASE_URL}/communication/messages/user/testUserId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([testMessage]));
    }
  ),

  rest.post(`${BASE_URL}/communication/message`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...testMessage,
        _id: "testMessageId2",
        sender: { _id: "testUserId2", name: "testUser2" },
        receiver: { _id: "testUserId", name: "testUser" },
      })
    );
  }),

  rest.patch(
    `${BASE_URL}/communication/message/read/testMessageId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ ...testMessage, read: true }));
    }
  ),

  // notifications
  rest.get(
    `${BASE_URL}/communication/notifications/testUserId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }
  ),

  rest.post(`${BASE_URL}/communication/notification`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testNotification));
  }),

  rest.patch(
    `${BASE_URL}/communication/notification/read/testNotificationId`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ ...testNotification, read: true })
      );
    }
  ),

  rest.delete(
    `${BASE_URL}/communication/notification/testNotificationId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(testNotification));
    }
  ),

  // conversations
  rest.get(
    `${BASE_URL}/communication/conversations/testUserId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }
  ),

  rest.post(`${BASE_URL}/communication/conversation`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testConversation));
  }),

  rest.delete(
    `${BASE_URL}/communication/conversation/testConversationId`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(testConversation));
    }
  ),
];
