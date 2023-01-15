import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { ChatConversationProps, UserHeader } from "../../utils/interfaces";
import CommunicationContext from "../../context/communicationContext";
import UserHeaderSimple from "./UserHeaderSimple";

const Conversation = ({ conversation }: ChatConversationProps) => {
  const { users, currentUser } = useContext(UserContext);
  const { onSetCurrentConversation } = useContext(CommunicationContext);
  const [user, setUser] = useState<UserHeader | undefined>(undefined);

  useEffect(() => {
    const secondUserId = conversation.members.find(
      (member: string | undefined) => member !== currentUser?._id
    );
    setUser(users?.find((user) => user._id === secondUserId));
  }, [conversation.members, currentUser?._id, users]);

  return (
    <>
      {user ? (
        <UserHeaderSimple
          key={conversation._id}
          user={user}
          isOnline={false}
          onClick={() => onSetCurrentConversation?.(conversation)}
        />
      ) : null}
    </>
  );
};

export default Conversation;
