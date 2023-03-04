import { Close } from "@mui/icons-material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { deleteNotification } from "../../../store/communication";

import { useAppDispatch } from "../../../store/store";
import { ReduxState } from "../../../utils/interfaces";

interface DeleteProps {
  _id?: string;
}

const Delete = ({ _id }: DeleteProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  return (
    <Close
      onClick={debounce(() => _id && dispatch(deleteNotification(_id)), 200)}
      sx={{
        color: palette.warning,
        borderRadius: "15px",
        cursor: "pointer",
      }}
    />
  );
};

export default Delete;
