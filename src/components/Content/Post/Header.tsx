import Like from "./Like";
import Delete from "./Delete";
import Author from "./Author";
import { Box } from "@mui/material";
import { Post, ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";

interface HeaderProps {
  post: Post;
}

const Header = ({ post }: HeaderProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        marginBottom: "1rem",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Author name={post.creator?.name} date={post?.createdAt} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "0",
          flexWrap: "wrap",
          color: palette.text.primary,
        }}
      >
        <Like post={post} />
        <Delete post={post} />
      </Box>
    </Box>
  );
};

export default Header;
