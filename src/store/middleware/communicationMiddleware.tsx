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
  updateMessage,
} from "../communication";
import { setUserUpdate } from "../currentUser";
import { BASE_URL } from "../../api/api";
import { io } from "socket.io-client";

const handleSendNotification = (
  {
    senderId,
    senderName,
    receiverId,
    silent,
    text,
    type,
    payload,
  }: Notification,
  socket: any
) => {
  setTimeout(() => {
    socket.emit("sendNotification", {
      senderId,
      senderName,
      receiverId,
      silent,
      text,
      type,
      payload,
    });
  }, 1000);
};

const actionTypes = {
  signIn: "currentUser/signin/fulfilled",
  externalSignin: "currentUser/externalSignin/fulfilled",
  signUp: "currentUser/signUp/fulfilled",
  signUpDemo: "currentUser/signUpDemo/fulfilled",
  logout: "currentUser/logout",
  addMessage: "communication/addMessage/fulfilled",
  readMessage: "communication/readMessage/fulfilled",
  followUser: "currentUser/followUser/fulfilled",
  addPost: "posts/addPost/fulfilled",
  addEvent: "events/addEvent/fulfilled",
  addBusiness: "businesses/addBusiness/fulfilled",
};

const communicationMiddleware: Middleware = (store) => {
  const socket = io(BASE_URL);

  return (next) => (action) => {
    if (
      action.type === actionTypes.signIn ||
      action.type === actionTypes.externalSignin ||
      action.type === actionTypes.signUp ||
      action.type === actionTypes.signUpDemo
    ) {
      if (action.payload) {
        socket.emit("addUser", action.payload.user._id);
        socket.on("getUsers", (users: UserHeader[]) => {
          store.dispatch(setOnlineUsers(users));
        });
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

        socket.on("getMessageUpdate", (message: ChatMessage) => {
          store.dispatch(updateMessage(message));
        });

        socket.on("getUserUpdate", (user: User) => {
          store.dispatch(setUserUpdate(user));
        });
      }
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
            handleSendNotification(
              {
                ...notification,
                senderId: action.payload.creator?._id,
                senderName: action.payload.creator?.name,
              },
              socket
            );
          });
        }
      }
    }

    if (action.type === actionTypes.addEvent) {
      if (action.payload) {
        const receivers = store.getState().currentUser.data?.followers;
        if (receivers && receivers?.length > 0) {
          receivers.forEach((follower: User) => {
            let notification = {
              receiverId: follower._id,
              text: "created a new event.",
              silent: false,
              read: false,
              type: "event",
              payload: { event: action.payload },
            };

            // @ts-ignore
            store.dispatch(addNotification(notification));
            handleSendNotification(
              {
                ...notification,
                senderId: action.payload.creator?._id,
                senderName: action.payload.creator?.name,
              },
              socket
            );
          });
        }
      }
    }

    if (action.type === actionTypes.addBusiness) {
      if (action.payload) {
        const receivers = store.getState().currentUser.data?.followers;
        if (receivers && receivers?.length > 0) {
          receivers.forEach((follower: User) => {
            let notification = {
              receiverId: follower._id,
              text: "created a new business.",
              silent: false,
              read: false,
              type: "business",
              payload: { business: action.payload },
            };

            // @ts-ignore
            store.dispatch(addNotification(notification));
            handleSendNotification(
              {
                ...notification,
                senderId: action.payload.creator._id,
                senderName: action.payload.creator.name,
              },
              socket
            );
          });
        }
      }
    }

    if (action.type === actionTypes.addMessage) {
      if (action.payload) {
        socket.emit("sendMessage", {
          ...action.payload,
          receiverId: action.payload.receiver._id,
        });
      }
    }

    if (action.type === actionTypes.readMessage) {
      if (action.payload) {
        socket.emit("updateMessage", action.payload);
      }
    }

    if (action.type === actionTypes.followUser) {
      if (action.payload) {
        let notification = {
          receiverId: action.payload.userToFollow._id,
          text: "started following you.",
          silent: false,
          read: false,
          type: "user",
          payload: { user: action.payload },
        };
        socket.emit("updateUser", action.payload);
        handleSendNotification(
          {
            ...notification,
            senderId: action.payload.activeUser._id,
            senderName: action.payload.activeUser.name,
          },
          socket
        );
      }
    }

    next(action);
  };
};

export default communicationMiddleware;
