import { useContext } from "react";
import UserContext from "../../context/userContext";
import { Avatar, Box, CardMedia, ListItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Post as PostProps } from "../../utils/interfaces";
import moment from "moment";

const Post = ({ creator, description, file, createdAt, likes }: PostProps) => {
  const { currentUser } = useContext(UserContext);

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
          <Avatar
            alt={creator?.name}
            src={"avatar"}
            sx={{
              margin: ".2rem .5rem .2rem 0",
              height: "2.5rem",
              width: "2.5rem",
              cursor: "pointer",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
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
        <MoreVertIcon sx={{ cursor: "pointer", color: "lightgrey" }} />
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
          margin: "1rem 0 .5rem 0",
          color: "white",
          flexWrap: "wrap",
        }}
      >
        {creator?._id === currentUser?._id ||
        likes?.find((user) => user._id === currentUser?._id) ? (
          <FavoriteIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} />
        )}
      </Box>
    </ListItem>
  );
};

export default Post;
