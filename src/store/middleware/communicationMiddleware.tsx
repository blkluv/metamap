import { Middleware } from "redux";
import {
  ChatMessage,
  Notification,
  User,
  UserHeader,
} from "../../utils/interfaces";
import {
  setOnlineUsers,
  addNotification,
  setArrivalMessage,
  setArrivalNotification,
} from "../communication";
import { io } from "socket.io-client";

const actionTypes = {
  signIn: "currentUser/signin/fulfilled",
  signUp: "currentUser/signup/fulfilled",
  signUpDemo: "currentUser/signupdemo/fulfilled",
  login: "currentUser/login",
  logout: "currentUser/logout",
  addMessage: "currentUser/addMessage/fulfilled",
  addPost: "posts/addPost/fulfilled",
  addEvent: "events/addEvent/fulfilled",
  addBusiness: "businesses/addBusiness/fulfilled",
};

const communicationMiddleware: Middleware = (store) => (next) => (action) => {
  const socket = io("https://geoevents-api-production.up.railway.app");

  if (action.type === actionTypes.login) {
    socket.on("getUsers", (users: UserHeader[]) => {
      store.dispatch(setOnlineUsers(users));
    });

    socket.emit("addUser", store.getState().currentUser.data?._id);
    socket.on(
      "getNotification",
      ({
        senderId,
        senderName,
        receiverId,
        silent,
        read,
        type,
        text,
        payload,
      }: Notification) => {
        store.dispatch(
          setArrivalNotification({
            senderId,
            senderName,
            receiverId,
            silent,
            read,
            type,
            text,
            payload,
          })
        );
      }
    );
    socket.on(
      "getMessage",
      ({ _id, sender, text, read, conversationId }: ChatMessage) => {
        store.dispatch(
          setArrivalMessage({
            _id,
            sender,
            text,
            read,
            conversationId,
            createdAt: Date.now(),
          })
        );
      }
    );
  }

  if (action.type === actionTypes.logout) {
    socket.close();
  }

  if (action.type === actionTypes.addPost) {
    if (action.payload) {
      const receivers = store.getState().currentUser.data?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower: User) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new post.",
            silent: false,
            read: false,
            type: "post",
            payload: { post: action.payload },
          };

          // @ts-ignore
          store.dispatch(addNotification(notification));
        });
      }
    }
  }

  if (action.type === actionTypes.addMessage) {
    if (action.payload) {
      const receiver = store
        .getState()
        .communication.data.currentConversation?.members.find(
          (member: string | undefined) =>
            member !== store.getState().currentUser.data?._id
        );

      socket.emit("sendMessage", {
        ...action.payload,
        receiverId: receiver._id,
      });
    }
  }

  next(action);
};

export default communicationMiddleware;
