import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import { CommentProps } from "../../utils/interfaces";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import moment from "moment";
import {
  ThumbUp,
  ThumbUpOffAlt,
  ThumbDown,
  ThumbDownOffAlt,
} from "@mui/icons-material";
import debounce from "../../utils/debounce";

const Comment = ({
  itemId,
  comment,
  onDelete,
  onLike,
  onDislike,
}: CommentProps) => {
  const { palette } = useContext(ThemeContext);
  const { currentUser, onGetAvatar } = useContext(UserContext);
  const [avatar, setAvatar] = useState<any>(null);

  const getAvatar = async (id: any) => {
    const avatar = await onGetAvatar?.(id);
    return setAvatar(avatar);
  };

  useEffect(() => {
    getAvatar(comment.creator?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.creator?.name]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        color: palette?.text.tertiary,
        padding: ".5rem 0",
        margin: ".8rem 0",
        "&:first-of-type": {
          margin: "0",
        },
      }}
    >
      <NavLink
        to={`/dashboard/profile/${comment.creator?.name}`}
        style={{ textDecoration: "none" }}
      >
        <Avatar
          alt={comment.creator?.name}
          src={avatar}
          sx={{
            margin: ".2rem .5rem .2rem 0",
            height: "2rem",
            width: "2rem",
            cursor: "pointer",
          }}
        />
      </NavLink>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: ".9rem" }}>
          <NavLink
            to={`/dashboard/profile/${comment.creator?.name}`}
            style={{
              textDecoration: "none",
              color: palette?.text.tertiary,
              fontWeight: 700,
            }}
          >
            {comment.creator?.name}
          </NavLink>
          {` ${comment.text}`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexwrap: "wrap",
            margin: ".4rem 0 0 0",
            alignItems: "center",
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
          {currentUser?._id === comment.creator?._id ? (
            <Box
              sx={{
                margin: 0,
                color: palette?.warning,
                marginRight: ".5rem",
                fontWeight: 500,
                fontSize: ".8rem",
                cursor: "pointer",
                display: "flex",
              }}
              onClick={() => itemId && onDelete?.(itemId, comment)}
            >
              Delete
            </Box>
          ) : null}
          <Box
            sx={{
              display: "flex",
              marginRight: ".5rem",
              alignItems: "center",
            }}
          >
            {comment.likes?.find((user) => user._id === currentUser?._id) ? (
              <ThumbUp
                sx={{
                  fontSize: ".9rem",
                  cursor: "pointer",
                  color: palette?.text.primary,
                }}
                onClick={debounce(
                  () => itemId && onLike?.(itemId, comment),
                  300
                )}
              />
            ) : (
              <ThumbUpOffAlt
                sx={{ fontSize: "1rem", cursor: "pointer" }}
                onClick={debounce(
                  () => itemId && onLike?.(itemId, comment),
                  300
                )}
              />
            )}
            <Typography
              sx={{ display: "block", marginLeft: ".3rem" }}
              component="span"
              variant="body2"
              fontSize={".8rem"}
            >
              {comment.likes?.length ? comment.likes.length : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginRight: ".5rem",
              alignItems: "center",
            }}
          >
            {comment.dislikes?.find((user) => user._id === currentUser?._id) ? (
              <ThumbDown
                sx={{
                  fontSize: ".9rem",
                  cursor: "pointer",
                  color: palette?.text.primary,
                }}
                onClick={debounce(
                  () => itemId && onDislike?.(itemId, comment),
                  300
                )}
              />
            ) : (
              <ThumbDownOffAlt
                sx={{ fontSize: "1rem", cursor: "pointer" }}
                onClick={debounce(
                  () => itemId && onDislike?.(itemId, comment),
                  300
                )}
              />
            )}
            <Typography
              sx={{ display: "block", marginLeft: ".3rem" }}
              component="span"
              variant="body2"
              fontSize={".8rem"}
            >
              {comment.dislikes?.length ? comment.dislikes.length : ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
