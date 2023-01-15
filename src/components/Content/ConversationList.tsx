import { useContext, useEffect } from "react";
import { ChatConversation } from "../../utils/interfaces";
import Conversation from "./Conversation";
import CommunicationContext from "../../context/communicationContext";
import UserContext from "../../context/userContext";

const ConversationList = () => {
  const { conversations, onGetConversations } =
    useContext(CommunicationContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    onGetConversations?.(currentUser?._id);
  }, [currentUser, onGetConversations]);

  return (
    <>
      {conversations.length > 0
        ? conversations.map((conversation: ChatConversation) => (
            <Conversation conversation={conversation} key={conversation._id} />
          ))
        : null}
    </>
  );
};

export default ConversationList;
