import { useContext, useEffect } from "react";
import CommunicationContext from "../../context/communicationContext";
import ThemeContext from "../../context/themeContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Avatar, Box, Typography } from "@mui/material";
import { ChatMessageProps } from "../../utils/interfaces";
// @ts-ignore
import ReactEmoji from "react-emoji";
import moment from "moment";

const Message = ({
  message: { _id, read, text, createdAt },
  own,
}: ChatMessageProps) => {
  const { onReadMessage } = useContext(CommunicationContext);
  const { palette } = useContext(ThemeContext);

  useEffect(() => {
    !own && !read && onReadMessage?.(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: `${own ? "flex-end" : "flex-start"}`,
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", maxWidth: "60%" }}>
        {!own ? (
          <Avatar sx={{ marginRight: "10px", width: "2rem", height: "2rem" }} />
        ) : null}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: `${own ? "flex-end" : "flex-start"}`,
          }}
        >
          <Typography
            sx={{
              background: `${own ? palette?.blue : palette?.green}`,
              color: palette?.text.tertiary,
              borderRadius: "20px",
              padding: "10px 16px",
              fontSize: ".9rem",
              width: "fit-content",
              "& img": {
                margin: "0 .2rem",
              },
            }}
          >
            {ReactEmoji.emojify(text)}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              margin: "0 .3rem .3rem .3rem",
              justifyContent: `${own ? "flex-end" : "flex-start"}`,
              alignItems: "center",
              height: "1.5rem",
            }}
            component="span"
            variant="body2"
            color="grey"
            fontSize={".7rem"}
          >
            {moment(createdAt).fromNow()}
            {own && read && (
              <CheckCircleOutlineIcon
                sx={{ marginLeft: ".5rem", width: ".7rem" }}
              />
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
