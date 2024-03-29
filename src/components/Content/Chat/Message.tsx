import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Avatar, Box, Typography } from "@mui/material";
import { ChatMessageProps, ReduxState } from "../../../utils/interfaces";
// @ts-ignore
import ReactEmoji from "react-emoji";
import moment from "moment";
import { useSelector } from "react-redux";
import { readMessage } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";

const Message = ({
  message: { _id, read, text, createdAt },
  own,
}: ChatMessageProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  useEffect(() => {
    _id && !own && !read && dispatch(readMessage(_id));
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
              background: `${own ? palette.blue : palette.green}`,
              color: palette.text.tertiary,
              borderRadius: "20px",
              padding: "10px 16px",
              fontSize: ".9rem",
              width: "fit-content",
              "& img": {
                margin: "0 .2rem",
                width: ".9rem",
                height: ".9rem",
                padding: "0",
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
