import { useContext, memo } from "react";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import { NotificationProps } from "../../utils/interfaces";
import { Box, Button, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import RoomIcon from "@mui/icons-material/Room";
import ChatIcon from "@mui/icons-material/Chat";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import CloseIcon from "@mui/icons-material/Close";
import DraftsIcon from "@mui/icons-material/Drafts";
import ThemeContext from "../../context/themeContext";
import CommunicationContext from "../../context/communicationContext";
import debounce from "../../utils/debounce";
import moment from "moment";

const NotificationHeader = ({
  notification: { _id, text, read, type, senderName, createdAt },
}: NotificationProps) => {
  const { palette } = useContext(ThemeContext);
  const { onDeleteNotification, onReadNotification } =
    useContext(CommunicationContext);

  const renderIcon = (type: string | undefined) => {
    if (type === "event") return <RoomIcon sx={{ marginRight: ".5rem" }} />;
    if (type === "business") return <StoreIcon sx={{ marginRight: ".5rem" }} />;
    if (type === "social") return <GroupIcon sx={{ marginRight: ".5rem" }} />;
    if (type === "chat") return <ChatIcon sx={{ marginRight: ".5rem" }} />;
    return <ReportGmailerrorredIcon sx={{ marginRight: ".5rem" }} />;
  };

  return (
    <ListItem
      sx={{
        borderRadius: "15px",
        background: palette?.background.tertiary,
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        flex: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: palette?.text.tertiary,
        }}
      >
        {renderIcon(type)}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: ".9rem" }}>
            <NavLink
              to={`/dashboard/profile/${senderName}`}
              style={{
                textDecoration: "none",
                color: palette?.text.tertiary,
                fontWeight: 700,
              }}
            >
              {senderName}
            </NavLink>
            {` ${text}`}
          </Typography>
          <Typography
            sx={{ display: "block" }}
            component="span"
            variant="body2"
            color="grey"
            fontSize={".8rem"}
          >
            {moment(createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={debounce(() => onReadNotification?.(_id), 200)}
          sx={{
            color: !read ? palette?.warning : palette?.green,
            borderRadius: "15px",
          }}
        >
          {read ? <DraftsIcon /> : <MarkunreadIcon />}
        </Button>
        <CloseIcon
          onClick={debounce(() => onDeleteNotification?.(_id), 200)}
          sx={{
            color: palette?.warning,
            borderRadius: "15px",
            cursor: "pointer",
          }}
        />
      </Box>
    </ListItem>
  );
};

const MemoizedNotificationHeader = memo(NotificationHeader);

export default MemoizedNotificationHeader;
