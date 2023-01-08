import {
  useState,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import ChatService from "../services/chatService";
import { io } from "socket.io-client";
import {
  ChatContext as Chat,
  ChatConversation,
  ChatMessage,
  UserHeader,
} from "../utils/interfaces";
import UserContext from "./userContext";

const INITIAL_STATE: Chat = {
  messages: [],
  conversations: [],
  currentConversation: null,
};

ChatService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

const ChatContext = createContext(INITIAL_STATE);

export const ChatProvider = ({ children }: React.PropsWithChildren) => {
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<ChatMessage | null>(
    null
  );
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
    socket.current?.emit("addUser", currentUser?._id);
    socket.current?.on("getUsers", (users: UserHeader[]) => {
      setOnlineUsers(users);
    });
  }, [currentUser?._id]);

  const memoizedHandleGetMessages = useMemo(
    () => async (id: string | undefined) => {
      const response = await ChatService.getMessages(id);
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
    const response = await ChatService.addMessage(message);
    if (response) {
      setMessages([...messages, response]);
    }
  };

  const memoizedGetConversations = useMemo(
    () => async (id: string | undefined) => {
      const response = await ChatService.getConversations(id);
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
    const response = await ChatService.addConversation(conversation);
    if (response) {
      setCurrentConversation(response);
      setConversations([...conversations, response]);
    }
  };

  const handleGetMembersConversation = async (
    firstUserId: string | undefined,
    secondUserId: string | undefined
  ) => {
    const response = await ChatService.getMembersConversation(
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

  return (
    <ChatContext.Provider
      value={{
        socket,
        messages,
        onlineUsers,
        setMessages,
        setArrivalMessage,
        conversations,
        currentConversation,
        onGetMessages: handleGetMessages,
        onGetConversations: handleGetConversations,
        onGetMembersConversation: handleGetMembersConversation,
        onAddMessage: handleAddMessage,
        onAddConversation: handleAddConversation,
        onSetCurrentConversation: setCurrentConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
