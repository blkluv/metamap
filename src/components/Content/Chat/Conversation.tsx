import { useEffect, useState } from "react";
import {
  ChatConversationProps,
  ReduxState,
  UserHeader,
} from "../../../utils/interfaces";
import UserHeaderSimple from "../User/UserHeaderSimple";
import { useSelector } from "react-redux";
import { getUsers } from "../../../store/users";
import { setCurrentConversation } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const Conversation = ({ conversation }: ChatConversationProps) => {
  const [users, setUsers] = useState<UserHeader[]>([]);
  const dispatch = useAppDispatch();
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const { userMessages } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const [user, setUser] = useState<UserHeader | undefined>(undefined);

  useEffect(() => {
    const secondUserId = conversation.members.find(
      (member: string | undefined) => member !== _id
    );
    setUser(users.find((user) => user._id === secondUserId));
  }, [conversation.members, _id, users]);

  const ifUnread = () => {
    const message = userMessages.find(
      (message) => !message.read && message.conversationId === conversation._id
    );
    return message ? true : false;
  };

  const getAllUsers = async () => {
    const users = await getUsers();
    users && setUsers(users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {user ? (
        <UserHeaderSimple
          key={conversation._id}
          user={user}
          isOnline={false}
          unreadCheck={ifUnread()}
          onClick={() => dispatch(setCurrentConversation(conversation))}
        />
      ) : null}
    </>
  );
};

export default Conversation;
