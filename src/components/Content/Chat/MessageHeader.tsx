import { memo } from "react";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { MessageProps, ReduxState } from "../../../utils/interfaces";
import { Chat, Send } from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";
import { setCurrentConversation } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const MessageHeader = ({
  message: { text, sender, conversationId, createdAt },
}: MessageProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { conversations } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const dispatch = useAppDispatch();

  return (
    <ListItem
      sx={{
        borderRadius: "15px",
        background: palette.background.tertiary,
        marginBottom: "1rem",
        paddingRight: ".2rem",
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
          color: palette.text.tertiary,
        }}
      >
        <Chat sx={{ marginRight: ".5rem", width: "1rem" }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: ".9rem" }}>
            <NavLink
              to={`/dashboard/profile/${sender?.name}`}
              style={{
                textDecoration: "none",
                color: palette.text.tertiary,
                fontWeight: 700,
              }}
            >
              {sender?.name}:
            </NavLink>
            {text.length <= 15 ? ` ${text}` : ` ${text?.slice(0, 15)}...`}
          </Typography>
          <Typography
            sx={{ display: "block" }}
            component="span"
            variant="body2"
            color="grey"
            fontSize={".7rem"}
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
          onClick={() =>
            dispatch(
              setCurrentConversation(
                conversations.find(
                  (conversation) => conversation._id === conversationId
                ) || null
              )
            )
          }
          sx={{ borderRadius: "15px", paddingRight: 0 }}
        >
          <Send />
        </Button>
      </Box>
    </ListItem>
  );
};

const MemoizedMessageHeader = memo(MessageHeader);

export default MemoizedMessageHeader;
