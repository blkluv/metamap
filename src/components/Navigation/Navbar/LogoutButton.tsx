import { MenuItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { logout } from "../../../store/currentUser";
import { useAppDispatch } from "../../../store/store";
import { ReduxState } from "../../../utils/interfaces";

interface LogoutButtonProps {
  closeMenu?: () => void;
}

const LogoutButton = ({ closeMenu }: LogoutButtonProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  return (
    <MenuItem
      onClick={() => {
        closeMenu?.();
        localStorage.removeItem("auth");
        dispatch(logout());
      }}
    >
      <Typography
        textAlign="center"
        color={palette.warning}
        sx={{ fontWeight: 500 }}
      >
        {"Logout"}
      </Typography>
    </MenuItem>
  );
};

export default LogoutButton;
