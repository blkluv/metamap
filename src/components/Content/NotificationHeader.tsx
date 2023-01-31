import { useContext, memo } from "react";
import ListItem from "@mui/material/ListItem";
import { NavLink, useNavigate } from "react-router-dom";
import { NotificationProps } from "../../utils/interfaces";
import { Box, Button, Typography } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import CommunicationContext from "../../context/communicationContext";
import debounce from "../../utils/debounce";
import moment from "moment";
import {
  Article,
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
  notification: { _id, text, read, type, senderName, createdAt, payload },
}: NotificationProps) => {
  const { palette } = useContext(ThemeContext);
  const { onDeleteNotification, onReadNotification, onSetTargetElement } =
    useContext(CommunicationContext);
  let navigate = useNavigate();

  const renderIcon = (type: string | undefined) => {
    if (type === "event") return <Room sx={{ marginRight: ".5rem" }} />;
    if (type === "post") return <Article sx={{ marginRight: ".5rem" }} />;
    if (type === "business") return <Store sx={{ marginRight: ".5rem" }} />;
    if (type === "social") return <Group sx={{ marginRight: ".5rem" }} />;
    if (type === "chat") return <Chat sx={{ marginRight: ".5rem" }} />;
    return <ReportGmailerrorred sx={{ marginRight: ".5rem" }} />;
  };

  const goToTarget = (_id: string | undefined, type: string | undefined) => {
    if (_id) {
      if (type === "event") {
        navigate("/dashboard/events");
        onSetTargetElement?.(_id);
        return;
      }
      if (type === "business") {
        navigate("/dashboard/business");
        onSetTargetElement?.(_id);
        return;
      }
      if (type === "post") {
        onSetTargetElement?.(_id);
        return;
      }
    }
  };

  const renderText = (
    type: string | undefined,
    text: string | undefined,
    payload: any
  ) => {
    if (type === "event" && payload)
      return (
        <Box style={{ cursor: "pointer", display: "flex", flexWrap: "wrap" }}>
          {text?.replace("event.", "")}
          <Typography
            sx={{ fontWeight: "700", marginLeft: ".2rem", fontSize: ".9rem" }}
            onClick={() => goToTarget(payload.event._id, type)}
          >
            event.
          </Typography>
        </Box>
      );
    if (type === "post" && payload)
      return (
        <Box style={{ cursor: "pointer", display: "flex", flexWrap: "wrap" }}>
          {text?.replace("post.", "")}
          <Typography
            sx={{ fontWeight: "700", marginLeft: ".2rem", fontSize: ".9rem" }}
            onClick={() => goToTarget(payload.post._id, type)}
          >
            post.
          </Typography>
        </Box>
      );
    if (type === "business" && payload)
      return (
        <Box style={{ cursor: "pointer", display: "flex", flexWrap: "wrap" }}>
          {text?.replace("business.", "")}
          <Typography
            sx={{ fontWeight: "700", marginLeft: ".2rem", fontSize: ".9rem" }}
            onClick={() => goToTarget(payload.business._id, type)}
          >
            business.
          </Typography>
        </Box>
      );
    if (type === "social") return text;
    if (type === "chat") return text;
    return text;
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
          <Box sx={{ fontSize: ".9rem", display: "flex", flexWrap: "wrap" }}>
            <NavLink
              to={`/dashboard/profile/${senderName}`}
              style={{
                textDecoration: "none",
                color: palette?.text.tertiary,
                fontWeight: 700,
                marginRight: ".2rem",
              }}
            >
              {senderName}
            </NavLink>
            {renderText(type, text, payload)}
          </Box>
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
