import { useEffect } from "react";
import { ChatConversation, ReduxState } from "../../utils/interfaces";
import Conversation from "./Conversation";
import { useSelector } from "react-redux";
import { getConversations } from "../../store/communication";
import { useAppDispatch } from "../../store/store";

const ConversationList = () => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const { conversations } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations?.(currentUser?._id));
  }, [currentUser?._id, dispatch]);

  return (
    <>
      {conversations && conversations.length > 0
        ? conversations.map((conversation: ChatConversation) => (
            <Conversation conversation={conversation} key={conversation?._id} />
          ))
        : null}
    </>
  );
};

export default ConversationList;
