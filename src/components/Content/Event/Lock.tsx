import { DoNotDisturb } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";

interface LockProps {
  end: any;
}

const Lock = ({ end }: LockProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <>
      {new Date(end) < new Date() ? (
        <Box
          sx={{
            display: "flex",
            justifySelf: "center",
            alignSelf: "center",
            fontWeight: "bold",
            marginBottom: ".5rem",
          }}
        >
          <DoNotDisturb
            sx={{
              color: palette.warning,
              width: "1.2rem",
              marginRight: ".2rem",
            }}
          />
          <Typography color={palette.warning} sx={{ fontWeight: "bold" }}>
            Ended
          </Typography>
        </Box>
      ) : null}
    </>
  );
};

export default Lock;
