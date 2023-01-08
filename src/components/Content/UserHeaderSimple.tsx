import { useCallback, useContext, useEffect, useState, memo } from "react";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import UserContext from "../../context/userContext";
import { UserHeaderSimpleProps } from "../../utils/interfaces";

const UserHeaderSimple = ({
  user,
  isOnline,
  onClick,
}: UserHeaderSimpleProps) => {
  const { onGetAvatar } = useContext(UserContext);
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

  const getAvatar = useCallback(
    async (id: string) => {
      const avatar = await onGetAvatar?.(id);
      return setAvatar(avatar);
    },
    [onGetAvatar]
  );

  useEffect(() => {
    getAvatar(user?.name);
  }, [getAvatar, user?.name]);

  return (
    <Box
      onClick={() => onClick(user)}
      sx={{
        display: "flex",
        margin: ".8rem 0",
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
            margin: "0 .5rem .2rem 0",
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
            margin: "0 .5rem .2rem 0",
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
      <Typography sx={{ fontSize: ".9rem" }}>{user?.name}</Typography>
    </Box>
  );
};

const MemoizedUserHeaderSimple = memo(UserHeaderSimple);

export default MemoizedUserHeaderSimple;
