import { useContext } from "react";
import ThemeContext from "../../context/themeContext";
import { Avatar, Box, Typography } from "@mui/material";
import { ChatMessageProps } from "../../utils/interfaces";
import moment from "moment";

const Message = ({ message, own }: ChatMessageProps) => {
  const { palette } = useContext(ThemeContext);

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
            }}
          >
            {message.text}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              margin: ".3rem",
              justifyContent: `${own ? "flex-end" : "flex-start"}`,
            }}
            component="span"
            variant="body2"
            color="grey"
            fontSize={".7rem"}
          >
            {moment(message.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
