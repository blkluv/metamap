import {
  useState,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import CommunicationService from "../services/communicationService";
import { io } from "socket.io-client";
import {
  CommunicationContext as Communication,
  ChatConversation,
  ChatMessage,
  UserHeader,
  Notification,
} from "../utils/interfaces";
import UserContext from "./userContext";

const INITIAL_STATE: Communication = {
  messages: [],
  userMessages: [],
  conversations: [],
  notifications: [],
  currentConversation: null,
};

CommunicationService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

const CommunicationContext = createContext(INITIAL_STATE);

export const CommunicationProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { currentUser, onSetCurrentUser } = useContext(UserContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<ChatMessage | null>(
    null
  );
  const [arrivalNotification, setArrivalNotification] =
    useState<Notification | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<UserHeader[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ChatConversation | null>(null);
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("localhost:5500");
    socket.current?.on(
      "getMessage",
      ({ _id, sender, text, read, conversationId }: ChatMessage) => {
        setArrivalMessage({
          _id,
          sender,
          text,
          read,
          conversationId,
          createdAt: Date.now(),
        });
      }
    );
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender?._id) &&
      setMessages((prev: ChatMessage[]) => [...prev, arrivalMessage]);

    arrivalMessage &&
      arrivalMessage.conversationId !== currentConversation?._id &&
      setUserMessages((prev: ChatMessage[]) => [arrivalMessage, ...prev]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalMessage]);

  useEffect(() => {
    if (currentUser) {
      handleGetUserMessages(currentUser?._id);
      socket.current?.emit("addUser", currentUser?._id);
    } else {
      socket.current?.emit("deleteUser");
    }
    socket.current?.on("getUsers", (users: UserHeader[]) => {
      setOnlineUsers(users);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    socket.current?.on(
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
        setArrivalNotification({
          senderId,
          senderName,
          receiverId,
          silent,
          read,
          type,
          text,
          payload,
        });
      }
    );
  }, [notifications]);

  const memoizedHandleGetMessages = useMemo(
    () => async (id: string | undefined) => {
      const response = await CommunicationService.getMessages(id);
      if (response) {
        setMessages(response);
      }
    },
    []
  );

  const handleGetMessages = useCallback(memoizedHandleGetMessages, [
    memoizedHandleGetMessages,
  ]);

  const memoizedHandleGetUserMessages = useMemo(
    () => async (id: string | undefined) => {
      const response = await CommunicationService.getUserMessages(id);
      if (response) {
        setUserMessages(response);
      }
    },
    []
  );

  const handleGetUserMessages = useCallback(memoizedHandleGetUserMessages, [
    memoizedHandleGetUserMessages,
  ]);

  const handleAddMessage = async (message: ChatMessage) => {
    const response = await CommunicationService.addMessage(message);
    if (response) {
      const receiverId = currentConversation?.members.find(
        (member: string | undefined) => member !== currentUser?._id
      );
      socket.current?.emit("sendMessage", { ...response, receiverId });
      setMessages((prev: ChatMessage[]) => [...prev, response]);
    }
  };

  const handleReadMessage = async (id: string | undefined) => {
    const updatedMessage = await CommunicationService.readMessage(id);
    if (updatedMessage) {
      let notification = {
        receiverId: updatedMessage.sender?._id,
        text: "read your message.",
        silent: true,
        read: true,
        type: "message",
      };

      handleAddNotification?.(notification);
      handleSendNotification?.({
        ...notification,
        senderId: updatedMessage.sender?._id,
        senderName: updatedMessage.sender?.name,
        payload: { message: updatedMessage },
      });

      const mapMessage = (message: ChatMessage) =>
        message._id === updatedMessage._id ? updatedMessage : message;

      setMessages((messages) => messages.map(mapMessage));
      setUserMessages((userMessages) => userMessages.map(mapMessage));
    }
  };

  const memoizedGetConversations = useMemo(
    () => async (id: string | undefined) => {
      const response = await CommunicationService.getConversations(id);
      if (response) {
        setConversations(response);
      }
    },
    []
  );

  const handleGetConversations = useCallback(memoizedGetConversations, [
    memoizedGetConversations,
  ]);

  const handleAddConversation = async (conversation: ChatConversation) => {
    const response = await CommunicationService.addConversation(conversation);
    if (response) {
      setCurrentConversation(response);
      setConversations([...conversations, response]);
    }
  };

  const handleAddNotification = async (notification: Notification) => {
    await CommunicationService.addNotification(notification);
  };

  const handleGetMembersConversation = async (
    firstUserId: string | undefined,
    secondUserId: string | undefined
  ) => {
    const response = await CommunicationService.getMembersConversation(
      firstUserId,
      secondUserId
    );
    if (response) {
      const ifExists = conversations.find(
        (conversation) => conversation._id === response._id
      );

      if (!ifExists) {
        setConversations([...conversations, response]);
      }

      if (!(currentConversation?._id === response._id)) {
        setCurrentConversation(response);
      }
    }
  };

  const memoizedGetNotifications = useMemo(
    () => async (id: string | undefined) => {
      const response = await CommunicationService.getNotifications(id);
      if (response) {
        setNotifications(response);
      }
    },
    []
  );

  const handleGetNotifications = useCallback(memoizedGetNotifications, [
    memoizedGetNotifications,
  ]);

  const handleReadNotification = async (id: string | undefined) => {
    const updatedNotification = await CommunicationService.readNotification(id);
    if (updatedNotification) {
      const updatedNotifications = notifications.map((notification) =>
        notification._id === updatedNotification._id
          ? updatedNotification
          : notification
      );
      setNotifications(updatedNotifications);
    }
  };

  const handleDeleteNotification = async (id: string | undefined) => {
    const deletedNotification = await CommunicationService.deleteNotification(
      id
    );
    if (!deletedNotification) {
      const updatedNotifications = notifications.filter(
        (notification) => notification._id !== id
      );
      setNotifications(updatedNotifications);
    }
  };

  const handleSendNotification = ({
    senderId,
    senderName,
    receiverId,
    silent,
    text,
    type,
    payload,
  }: Notification) => {
    socket.current?.emit("sendNotification", {
      senderId,
      senderName,
      receiverId,
      silent,
      text,
      type,
      payload,
    });
  };

  useEffect(() => {
    if (currentUser && arrivalNotification && arrivalNotification?.payload) {
      handleGetNotifications(arrivalNotification.receiverId);

      // user
      if (arrivalNotification?.type === "social") {
        const { _id, name } = arrivalNotification.payload;

        let updatedUser;

        if (currentUser.followers?.find((follower) => follower._id === _id)) {
          updatedUser = {
            ...currentUser,
            followers: currentUser.followers?.filter(
              (follower) => follower._id !== _id
            ),
          };
        } else {
          updatedUser = {
            ...currentUser,
            followers: [...(currentUser.followers || []), { _id, name }],
          };
        }

        onSetCurrentUser?.(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }

      // message
      if (arrivalNotification?.type === "message") {
        const { message: updatedMessage } = arrivalNotification.payload;

        const mapMessage = (message: ChatMessage) =>
          message._id === updatedMessage._id ? updatedMessage : message;

        setMessages((messages) => messages.map(mapMessage));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalNotification]);

  return (
    <CommunicationContext.Provider
      value={{
        socket,
        messages,
        userMessages,
        onReadMessage: handleReadMessage,
        notifications,
        onlineUsers,
        setMessages,
        arrivalNotification,
        setNotifications,
        setArrivalMessage,
        conversations,
        currentConversation,
        onGetMessages: handleGetMessages,
        onGetUserMessages: handleGetUserMessages,
        onGetConversations: handleGetConversations,
        onGetMembersConversation: handleGetMembersConversation,
        onAddNotification: handleAddNotification,
        onSendNotification: handleSendNotification,
        onGetNotifications: handleGetNotifications,
        onAddMessage: handleAddMessage,
        onAddConversation: handleAddConversation,
        onSetCurrentConversation: setCurrentConversation,
        onReadNotification: handleReadNotification,
        onDeleteNotification: handleDeleteNotification,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  );
};

export default CommunicationContext;
