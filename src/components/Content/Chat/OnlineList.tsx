import { useEffect, useState } from "react";
import { AccordionDetails, Box } from "@mui/material";
import UserHeaderSimple from "../UserHeaderSimple";
import SearchField from "../../Elements/SearchField";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { ReduxState, UserHeader } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { getMembersConversation } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const OnlineList = () => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const { onlineUsers } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [online, setOnline] = useState<(string | null | undefined)[]>([]);
  const [filteredItems, setFilteredItems] = useState<
    UserHeader[] | null | undefined
  >(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (onlineUsers && onlineUsers.length > 0) {
      setOnline(onlineUsers.map((user: UserHeader) => user.userId));
    }
  }, [currentUser, onlineUsers]);

  const handleClick = (user: UserHeader) => {
    const membersData = {
      firstUserId: currentUser._id,
      secondUserId: user._id,
    };
    dispatch(getMembersConversation(membersData));
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
    <AccordionDetails>
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
            color: palette.text.tertiary,
            "&:hover": {
              color: palette.text.primary,
            },
          }}
        >
          Add some
        </Link>
      )}
    </AccordionDetails>
  );
};

export default OnlineList;
