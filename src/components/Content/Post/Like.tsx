import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { likePost } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";
import { Post, ReduxState } from "../../../utils/interfaces";
import { notify } from "../../../utils/notifications";

interface LikeProps {
  post: Post;
}

const Like = ({ post }: LikeProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id } = useSelector((state: ReduxState) => state.currentUser.data);
  const dispatch = useAppDispatch();

  const handleLikePost = () => {
    if (post.creator?._id === _id) {
      notify("You can't like your own post.");
    } else {
      post._id && dispatch(likePost(post._id));
    }
  };

  return (
    <>
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
      {post.likes?.find((user) => user._id === _id) ? (
        <Favorite
          sx={{
            fontSize: "1.4rem",
            cursor: "pointer",
            color: palette.warning,
          }}
          onClick={debounce(() => handleLikePost(), 250)}
        />
      ) : (
        <FavoriteBorder
          sx={{
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
          onClick={debounce(() => handleLikePost(), 250)}
        />
      )}
    </>
  );
};

export default Like;
