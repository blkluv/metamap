import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ConfirmationDialog from "../Elements/ConfirmationDialog";
import UserContext from "../../context/userContext";
import PostContext from "../../context/postContext";
import { Avatar, Box, CardMedia, ListItem, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Post as PostProps } from "../../utils/interfaces";
import { notify } from "../../utils/notifications";
import moment from "moment";
import debounce from "../../utils/debounce";

const Post = ({
  _id,
  creator,
  description,
  file,
  createdAt,
  likes,
}: PostProps) => {
  const { currentUser, onGetAvatar } = useContext(UserContext);
  const { onLikePost, onDeletePost } = useContext(PostContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    getAvatar(creator?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLikePost = () => {
    if (creator?._id === currentUser?._id) {
      notify("You can't like your own post.");
    } else {
      onLikePost?.(_id);
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    await onDeletePost?.(_id);
    setIsOpen(false);
  };

  const getAvatar = async (id: any) => {
    const avatar = await onGetAvatar?.(id);
    return setAvatar(avatar);
  };

  return (
    <ListItem
      sx={{
        borderRadius: "25px",
        background: "rgb(53,51,64)",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1.5rem",
        alignItems: "flex-start",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
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
            to={`/dashboard/profile/${creator?.name}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              alt={creator?.name}
              src={avatar}
              sx={{
                margin: ".2rem .5rem .2rem 0",
                height: "2.5rem",
                width: "2.5rem",
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
              to={`/dashboard/profile/${creator?.name}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{
                  display: "block",
                  cursor: "pointer",
                }}
                component="span"
                variant="body2"
                color="white"
                fontSize={".9rem"}
                fontWeight={500}
              >
                {creator?.name}
              </Typography>
            </NavLink>
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
        {currentUser?._id === creator?._id ? (
          <DeleteForeverIcon
            sx={{ cursor: "pointer", color: "lightgrey" }}
            onClick={() => handleOpenDialog()}
          />
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{ display: "block", margin: "0 0 .5rem 0" }}
          component="p"
          variant="body2"
          color="lightgrey"
          fontSize={"1rem"}
        >
          {description}
        </Typography>
        {file ? (
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "250px",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
            image={file}
            alt={"Post photo"}
          />
        ) : (
          <></>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "1rem 0 0 0",
          flexWrap: "wrap",
          color: "white",
        }}
      >
        {likes?.find((user) => user._id === currentUser?._id) ? (
          <FavoriteIcon
            sx={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "rgb(235, 110, 105)",
            }}
            onClick={debounce(() => handleLikePost(), 400)}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={debounce(() => handleLikePost(), 400)}
          />
        )}
        <Typography
          sx={{ display: "block", marginLeft: ".5rem" }}
          component="span"
          variant="body2"
          fontSize={".9rem"}
        >
          {likes?.length ? likes.length : ""}
        </Typography>
      </Box>
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
