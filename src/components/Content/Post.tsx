import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Comments from "./Comments";
import ConfirmationDialog from "../Elements/ConfirmationDialog";
import {
  Avatar,
  Box,
  CardMedia,
  Divider,
  ListItem,
  Typography,
} from "@mui/material";
import { PostHeader, ReduxState } from "../../utils/interfaces";
import { notify } from "../../utils/notifications";
import moment from "moment";
import debounce from "../../utils/debounce";
import {
  Favorite,
  FavoriteBorder,
  RemoveCircleOutline,
} from "@mui/icons-material";
// @ts-ignore
import ReactEmoji from "react-emoji";
import { useSelector } from "react-redux";
import { getUser } from "../../store/users";
import { likePost, deletePost } from "../../store/posts";
import { useAppDispatch } from "../../store/store";

const Post = ({ post, innerRef }: PostHeader) => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    post.creator && getAvatar(post.creator.name);
  }, [currentUser, post.creator]);

  const handleLikePost = () => {
    if (post.creator?._id === currentUser?._id) {
      notify("You can't like your own post.");
    } else {
      post._id && dispatch(likePost(post._id));
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    if (post._id) {
      dispatch(deletePost(post._id));
      setIsOpen(false);
    }
  };

  const getAvatar = async (id: string) => {
    const user = await getUser(id);
    return setAvatar(user?.avatar);
  };

  return (
    <ListItem
      ref={innerRef}
      sx={{
        borderRadius: "25px",
        background: palette.background.tertiary,
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1.5rem",
        alignItems: "flex-start",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        "&:last-child": {
          marginBottom: "2.5rem",
        },
      }}
    >
      <Box
        sx={{
          marginBottom: "1rem",
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavLink
            to={`/dashboard/profile/${post.creator?.name}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              alt={post.creator?.name}
              src={avatar}
              sx={{
                margin: ".2rem .5rem .2rem 0",
                height: "2.2rem",
                width: "2.2rem",
                cursor: "pointer",
              }}
            />
          </NavLink>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavLink
              to={`/dashboard/profile/${post.creator?.name}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{
                  display: "block",
                  cursor: "pointer",
                }}
                component="span"
                variant="body2"
                color={palette.text.tertiary}
                fontSize={".9rem"}
                fontWeight={500}
              >
                {post.creator?.name}
              </Typography>
            </NavLink>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color="grey"
              fontSize={".8rem"}
            >
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "0",
            flexWrap: "wrap",
            color: palette.text.primary,
          }}
        >
          {post.likes?.find((user) => user._id === currentUser?._id) ? (
            <Favorite
              sx={{
                fontSize: "1.4rem",
                cursor: "pointer",
                color: palette.warning,
              }}
              onClick={debounce(() => handleLikePost(), 300)}
            />
          ) : (
            <FavoriteBorder
              sx={{
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
              onClick={debounce(() => handleLikePost(), 300)}
            />
          )}
          {post.likes?.length ? (
            <Typography
              sx={{
                display: "block",
                marginLeft: ".3rem",
                marginRight: ".5rem",
              }}
              component="span"
              variant="body2"
              fontSize={".9rem"}
            >
              {post.likes.length}
            </Typography>
          ) : null}
          {currentUser?._id === post.creator?._id ? (
            <RemoveCircleOutline
              sx={{
                cursor: "pointer",
                color: palette.text.primary,
                fontSize: "1.2rem",
                marginLeft: ".3rem",
              }}
              onClick={() => handleOpenDialog()}
            />
          ) : null}
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            margin: "0 0 .5rem 0",
            "& img": {
              margin: "0 .2rem",
              width: ".9rem",
              height: ".9rem",
              padding: "0",
            },
          }}
          component="p"
          variant="body2"
          color={palette.text.tertiary}
          fontSize={"1rem"}
        >
          {ReactEmoji.emojify(post.description)}
        </Typography>
        {post.file ? (
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "250px",
              borderRadius: "10px",
              marginTop: "1rem",
              marginBottom: ".5rem",
            }}
            image={post.file}
            alt={"Post photo"}
          />
        ) : (
          <></>
        )}
      </Box>
      <Divider
        variant="middle"
        sx={{
          background: "rgb(120,120,126)",
          margin: ".8rem 0 0 0",
          width: "100%",
        }}
      />
      <Comments item={post} />
      <ConfirmationDialog
        title={"Delete this post?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </ListItem>
  );
};

export default Post;
