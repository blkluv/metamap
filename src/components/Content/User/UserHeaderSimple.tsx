import { useCallback, useEffect, useState, memo } from "react";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/system";
import { ReduxState, UserHeaderSimpleProps } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/users";

const UserHeaderSimple = ({
  user,
  isOnline,
  onClick,
  unreadCheck,
}: UserHeaderSimpleProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const [avatar, setAvatar] = useState<string | null | undefined>(null);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      width: ".6rem",
      height: ".6rem",
      borderRadius: "50%",
      WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    },
  }));

  const getAvatar = useCallback(async (id: string) => {
    const user = await getUser(id);
    return setAvatar(user?.avatar);
  }, []);

  useEffect(() => {
    getAvatar(user?.name);
  }, [getAvatar, user?.name]);

  return (
    <Box
      onClick={() => onClick(user)}
      sx={{
        display: "flex",
        margin: "1rem 0",
        cursor: "pointer",
        alignItems: "center",
      }}
      key={user._id}
    >
      {!isOnline ? (
        <Avatar
          alt="User avatar"
          src={String(avatar)}
          sx={{
            marginRight: ".5rem",
            height: "2rem",
            width: "2rem",
            cursor: "pointer",
            alignSelf: "center",
          }}
        />
      ) : (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            marginRight: ".5rem",
            height: "2rem",
            width: "2rem",
            cursor: "pointer",
            alignSelf: "center",
          }}
        >
          <Avatar
            alt="User avatar"
            src={user.avatar}
            sx={{
              height: "2rem",
              width: "2rem",
            }}
          />
        </StyledBadge>
      )}
      <>
        <Typography sx={{ fontSize: ".9rem" }}>{user?.name}</Typography>{" "}
        {unreadCheck ? (
          <CircleIcon
            sx={{
              color: palette.green,
              marginLeft: ".5rem",
              width: ".8rem",
            }}
          />
        ) : null}
      </>
    </Box>
  );
};

const MemoizedUserHeaderSimple = memo(UserHeaderSimple);

export default MemoizedUserHeaderSimple;
