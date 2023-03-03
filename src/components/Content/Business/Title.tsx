import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";

interface TitleProps {
  name?: string | null;
}

const Title = ({ name }: TitleProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        color: palette.text.primary,
      }}
    >
      <Typography
        sx={{
          display: "block",
          fontWeight: "500",
          mb: ".5rem",
          mr: ".3rem",
        }}
        component="span"
        variant="body2"
        color={palette.text.tertiary}
        fontSize={"1rem"}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default Title;
