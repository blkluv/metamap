import { useContext, memo } from "react";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import { NotificationProps } from "../../utils/interfaces";
import { Box, Button, Typography } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import CommunicationContext from "../../context/communicationContext";
import debounce from "../../utils/debounce";
import moment from "moment";
import {
  Group,
  Store,
  Room,
  Chat,
  ReportGmailerrorred,
  Markunread,
  Close,
  Drafts,
} from "@mui/icons-material";

const NotificationHeader = ({
  notification: { _id, text, read, type, senderName, createdAt },
}: NotificationProps) => {
  const { palette } = useContext(ThemeContext);
  const { onDeleteNotification, onReadNotification } =
    useContext(CommunicationContext);

  const renderIcon = (type: string | undefined) => {
    if (type === "event") return <Room sx={{ marginRight: ".5rem" }} />;
    if (type === "business") return <Store sx={{ marginRight: ".5rem" }} />;
    if (type === "social") return <Group sx={{ marginRight: ".5rem" }} />;
    if (type === "chat") return <Chat sx={{ marginRight: ".5rem" }} />;
    return <ReportGmailerrorred sx={{ marginRight: ".5rem" }} />;
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
            minWidth: "0",
          }}
        >
          {read ? <Drafts /> : <Markunread />}
        </Button>
        <Close
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
