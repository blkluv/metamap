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
    socket.current?.on("getMessage", (data: ChatMessage) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: ChatMessage[]) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation, setMessages]);

  useEffect(() => {
    if (currentUser) {
      socket.current?.emit("addUser", currentUser?._id);
    } else {
      socket.current?.emit("deleteUser");
    }
    socket.current?.on("getUsers", (users: UserHeader[]) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  useEffect(() => {
    socket.current?.on("getNotification", (data: Notification) => {
      setArrivalNotification({
        senderId: data.senderId,
        senderName: data.senderName,
        receiverId: data.receiverId,
        silent: data.silent,
        read: data.read,
        type: data.type,
        text: data.text,
        payload: data.payload,
      });
    });
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

  const handleAddMessage = async (message: ChatMessage) => {
    const response = await CommunicationService.addMessage(message);
    if (response) {
      setMessages([...messages, response]);
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalNotification, handleGetNotifications]);

  return (
    <CommunicationContext.Provider
      value={{
        socket,
        messages,
        notifications,
        onlineUsers,
        setMessages,
        arrivalNotification,
        setNotifications,
        setArrivalMessage,
        conversations,
        currentConversation,
        onGetMessages: handleGetMessages,
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
