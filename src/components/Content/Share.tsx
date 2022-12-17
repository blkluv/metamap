import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PostContext from "../../context/postContext";
import UserContext from "../../context/userContext";
import convertImage from "../../utils/imageConverter";
import { Post } from "../../utils/interfaces";
import { Cancel, EmojiEmotions, PermMedia, Room } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Divider,
  FormLabel,
  Input,
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";
import ThemeContext from "../../context/themeContext";

const Share = () => {
  const { onAddPost } = useContext(PostContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [file, setFile] = useState<File | null>(null);

  const {
    register: registerPost,
    handleSubmit: handleRegisterPost,
    reset: resetPost,
  } = useForm({
    defaultValues: {
      description: null,
    },
  });

  const handleAddPost = async (data: { description: string | null }) => {
    const description = data.description?.trim();

    if (!description) {
      return notify("Please complete all fields.");
    }

    const postData: Post = {
      description,
    };

    if (file) {
      const convertedFile = await convertImage(file, 800, 600);
      postData.file = convertedFile;
    }

    try {
      onAddPost?.(postData);
      setFile(null);
      resetPost();
    } catch (err) {}
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleRegisterPost(debounce(handleAddPost, 400))}
        sx={{
          padding: "1rem 1.5rem",
          borderRadius: "25px",
          background: palette?.background.tertiary,
          WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavLink
            to={`/dashboard/profile/${currentUser?.name}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              alt="User avatar"
              src={currentUser?.avatar}
              sx={{
                height: { xs: "2rem", md: "2.5rem" },
                width: { xs: "2rem", md: "2.5rem" },
                marginRight: "10px",
              }}
            />
          </NavLink>
          <TextField
            placeholder="What's in your mind?"
            variant="standard"
            multiline={true}
            size="small"
            margin="dense"
            maxRows={3}
            InputProps={{ disableUnderline: true }}
            inputProps={{ style: { color: palette?.text.primary } }}
            fullWidth
            id="postShareDescription"
            autoComplete="postShareDescription"
            autoFocus
            {...registerPost("description", {
              required: true,
              minLength: 3,
              maxLength: 800,
            })}
          />
        </Box>
        {file && (
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              src={URL.createObjectURL(file)}
              sx={{
                width: "100%",
                height: "250px",
                borderRadius: "10px",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
              alt={"Post image"}
            />
            <Cancel
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                opacity: "0.8",
                background: "white",
                borderRadius: "50%",
              }}
              onClick={() => setFile(null)}
            />
          </Box>
        )}
        <Divider
          variant="middle"
          sx={{ background: palette?.divider, margin: "1rem 0" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginLeft: "0.5rem",
              marginRight: "1rem",
              color: "grey",
              flexWrap: "wrap",
            }}
          >
            <FormLabel
              htmlFor="file"
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <PermMedia
                htmlColor="tomato"
                sx={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
              />
              <Box
                component="span"
                sx={{ fontSize: "0.9rem", fontWeight: "500" }}
              >
                Photo
              </Box>
              <Input
                type="file"
                inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
                sx={{ display: "none" }}
                id="file"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </FormLabel>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
            >
              <Room
                htmlColor="green"
                sx={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
              <Box
                component="span"
                sx={{ fontSize: "14px", fontWeight: "500" }}
              >
                Location
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
            >
              <EmojiEmotions
                htmlColor="goldenrod"
                sx={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
              <Box
                component="span"
                sx={{ fontSize: "14px", fontWeight: "500" }}
              >
                Feelings
              </Box>
            </Box>
          </Box>
          <Button
            type="submit"
            sx={{
              fontSize: "0.8rem",
              border: "none",
              padding: "0.2rem",
              borderRadius: "5px",
              fontWeight: "500",
              marginRight: "0.5rem",
              cursor: "pointer",
              color: palette?.text.tertiary,
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Share;
