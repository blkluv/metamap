import { useState } from "react";
import { Check } from "@mui/icons-material";
import { Avatar, Box, FormLabel, Input } from "@mui/material";
import { ReduxState, User, UserHeader } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import convertImage from "../../../utils/imageConverter";
import { useAppDispatch } from "../../../store/store";
import { updateUser } from "../../../store/currentUser";

interface AvatarProps {
  user?: UserHeader;
}

const UserAvatar = ({ user }: AvatarProps) => {
  const [file, setFile] = useState<File | null>(null);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();

  const handleSubmitAvatar = async () => {
    let convertedFile;
    if (file) {
      convertedFile = await convertImage(file, 170, 170);
    }

    try {
      dispatch(updateUser({ dataType: "avatar", data: String(convertedFile) }));
      setFile(null);
    } catch (err) {}
  };

  const renderAvatar = (
    user: UserHeader | undefined | null,
    currentuser: User | undefined | null,
    file: any
  ) => {
    if (file) return URL.createObjectURL(file);
    if (user?._id === currentUser?._id) {
      return currentuser?.avatar;
    }
    if (user?.avatar) return user?.avatar;
    return "";
  };

  return (
    <Box sx={{ position: "relative" }}>
      <FormLabel htmlFor="file">
        <Avatar
          alt={"User avatar"}
          src={renderAvatar(user, currentUser, file)}
          sx={{
            margin: { xs: "0 1rem 1rem 0", sm: "0 1.5rem 1rem 0" },
            height: { xs: "4rem", sm: "4rem", md: "4rem", lg: "6rem" },
            width: { xs: "4rem", sm: "4rem", md: "4rem", lg: "6rem" },
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            cursor: user?._id === currentUser?._id ? "pointer" : "default",
          }}
        />
        {user?._id === currentUser?._id ? (
          <Input
            type="file"
            inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
            sx={{ display: "none" }}
            id="file"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
        ) : null}
      </FormLabel>
      {file ? (
        <Check
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer",
            opacity: "0.8",
            color: "yellowgreen",
            borderRadius: "50%",
            border: "1px solid yellowgreen",
          }}
          onClick={() => handleSubmitAvatar()}
        />
      ) : null}
    </Box>
  );
};

export default UserAvatar;
