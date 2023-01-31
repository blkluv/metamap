import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import CommunicationContext from "../../context/communicationContext";
import UserHeaderSimple from "./UserHeaderSimple";
import SearchField from "../Elements/SearchField";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { ChatProps, UserHeader } from "../../utils/interfaces";

const UsersOnline = ({ onlineUsers }: ChatProps) => {
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const { onGetMembersConversation } = useContext(CommunicationContext);
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
    <>
      {currentUser?.following && currentUser.following.length > 0 ? (
        <Box>
          <SearchField
            data={currentUser?.following}
            filter={handleFilter}
            vertical
          />
          {renderItems(filteredItems)?.map((user: UserHeader) => (
            <UserHeaderSimple
              key={user._id}
              user={user}
              isOnline={online.includes(user._id)}
              onClick={handleClick}
            />
          ))}
        </Box>
      ) : (
        <Link
          component={RouterLink}
          to="/dashboard/social"
          sx={{
            transition: "color .1s",
            fontSize: "1rem",
            textDecoration: "none",
            fontWeight: 500,
            color: palette?.text.secondary,
            "&:hover": {
              color: palette?.text.primary,
            },
          }}
        >
          Add some
        </Link>
      )}
    </>
  );
};

export default UsersOnline;
