// lack of types for the library
// @ts-ignore
import ReactEmoji from "react-emoji";
import { Box, CardMedia, Typography } from "@mui/material";
import { Post, ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";

interface BodyProps {
  post: Post;
}

const Body = ({ post }: BodyProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
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
      ) : null}
    </Box>
  );
};

export default Body;
