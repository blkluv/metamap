import { useState } from "react";
import { useForm } from "react-hook-form";
import convertImage from "../../utils/imageConverter";
import { Post, ReduxState } from "../../utils/interfaces";
import { Cancel, Image } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";
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
import { useSelector } from "react-redux";
import { addPost } from "../../store/posts";
import { useAppDispatch } from "../../store/store";

const Share = ({ scrollRef }: any) => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();
  const palette = useSelector((state: ReduxState) => state.theme.palette);
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
      const convertedFile = await convertImage(file, 480, 320);
      postData.file = convertedFile;
    }

    try {
      dispatch(addPost(postData));
      setFile(null);
      resetPost();
    } catch (err) {}
  };

  return (
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        borderRadius: "10px",
        paddingTop: ".5rem",
      }}
    >
      <Box
        component="form"
        onSubmit={handleRegisterPost(debounce(handleAddPost, 400))}
        sx={{
          padding: "1rem 1.5rem",
          margin: "0 .5rem",
          borderRadius: "25px",
          background: palette.background.tertiary,
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
                height: { xs: "2rem", md: "2.2rem" },
                width: { xs: "2rem", md: "2.2rem" },
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
            inputProps={{ style: { color: palette.text.tertiary } }}
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
          sx={{ background: palette.divider, margin: "1rem 0" }}
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
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <Image
                sx={{
                  fontSize: "1.2rem",
                  color: palette.warning,
                  marginRight: "-.2rem",
                }}
              />
              <Button
                component="span"
                sx={{
                  fontSize: "0.8rem",
                  border: "none",
                  padding: "0.2rem",
                  borderRadius: "5px",
                  fontWeight: "500",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                  color: palette.text.tertiary,
                }}
              >
                Photo
              </Button>
              <Input
                type="file"
                inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
                sx={{ display: "none" }}
                id="file"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </FormLabel>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              sx={{
                fontSize: "0.8rem",
                border: "none",
                padding: "0.2rem",
                borderRadius: "5px",
                fontWeight: "500",
                cursor: "pointer",
                color: palette.text.tertiary,
              }}
            >
              Share
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Share;
