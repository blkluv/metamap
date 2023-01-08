import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";
import ChatContext from "../../context/chatContext";
import UserHeaderSimple from "./UserHeaderSimple";
import SearchField from "../Elements/SearchField";
import { OnlineUsersProps, UserHeader } from "../../utils/interfaces";

const UsersOnline = ({ onlineUsers }: OnlineUsersProps) => {
  const { currentUser } = useContext(UserContext);
  const { onGetMembersConversation } = useContext(ChatContext);
  const [online, setOnline] = useState<(string | null | undefined)[]>([]);
  const [filteredItems, setFilteredItems] = useState<
    UserHeader[] | null | undefined
  >(null);

  useEffect(() => {
    if (onlineUsers) {
      setOnline(onlineUsers.map((user: UserHeader) => user.userId));
    }
  }, [currentUser, onlineUsers]);

  const handleClick = (user: UserHeader) => {
    onGetMembersConversation?.(currentUser?._id, user?._id);
  };

  const handleFilter = (data: UserHeader[] | null | undefined) => {
    if (data) {
      setFilteredItems(data);
    } else {
      setFilteredItems(null);
    }
  };

  const renderItems = (filtered: UserHeader[] | null | undefined) => {
    return filtered ? filtered : currentUser?.following;
  };

  return (
    <Box>
      <SearchField data={currentUser?.following} filter={handleFilter} />
      {renderItems(filteredItems)?.map((user: UserHeader) => (
        <UserHeaderSimple
          key={user._id}
          user={user}
          isOnline={online.includes(user._id)}
          onClick={handleClick}
        />
      ))}
    </Box>
  );
};

export default UsersOnline;
