import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { CommentProps, ReduxState } from "../../../utils/interfaces";
import moment from "moment";
// @ts-ignore
import ReactEmoji from "react-emoji";
import { useSelector } from "react-redux";
import Dislike from "./Dislike";
import Like from "./Like";
import Delete from "./Delete";
import UserAvatar from "./UserAvatar";

const Comment = ({ itemId, comment }: CommentProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        color: palette.text.tertiary,
        padding: ".5rem 0",
        margin: ".8rem 0",
        "&:first-of-type": {
          margin: "0",
        },
      }}
    >
      <UserAvatar name={comment.creator?.name} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& img": {
            margin: "0 .2rem",
            width: ".9rem",
            height: ".9rem",
            padding: "0",
          },
        }}
      >
        <Typography sx={{ fontSize: ".9rem" }}>
          <NavLink
            to={`/dashboard/profile/${comment.creator?.name}`}
            style={{
              textDecoration: "none",
              color: palette.text.tertiary,
              fontWeight: 700,
              marginRight: ".3rem",
            }}
          >
            {comment.creator?.name}
          </NavLink>
          {ReactEmoji.emojify(comment.text)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexwrap: "wrap",
            margin: ".4rem 0 0 0",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography
            sx={{ display: "block", marginRight: ".5rem" }}
            component="span"
            variant="body2"
            color="grey"
            fontSize={".8rem"}
          >
            {moment(comment.createdAt).fromNow()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: { xs: ".2rem", sm: "0" },
            }}
          >
            <Delete comment={comment} itemId={itemId} />
            <Like comment={comment} itemId={itemId} />
            <Dislike comment={comment} itemId={itemId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
