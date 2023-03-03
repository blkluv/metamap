import { Divider, ListItem } from "@mui/material";
import { PostHeader, ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import Comments from "../Comment/Comments";

const Post = ({ post, innerRef }: PostHeader) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

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
      <Header post={post} />
      <Body post={post} />
      <Divider
        variant="middle"
        sx={{
          background: "rgb(120,120,126)",
          margin: ".8rem 0 0 0",
          width: "100%",
        }}
      />
      <Comments item={post} />
    </ListItem>
  );
};

export default Post;
