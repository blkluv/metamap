import { Box, CardMedia, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ad from "../../images/ad.jpg";
import { ReduxState } from "../../utils/interfaces";

const Sponsored = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        borderRadius: "25px",
        background: palette.background.primary,
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1.5rem",
        alignItems: "flex-start",
        width: { xs: "100%", md: "40%" },
        height: "fit-content",
        border: `1px solid ${palette.background.tertiary}`,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{ fontWeight: 700, textTransform: "uppercase" }}
          color={palette.text.tertiary}
          fontSize={".7rem"}
        >
          Sponsored
        </Typography>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "250px",
            borderRadius: "10px",
            margin: "0.5rem 0 1rem 0",
            cursor: "pointer",
          }}
          image={ad}
          alt={"Ad photo"}
        />
        <Typography
          sx={{ display: "block", margin: "0 0 .5rem 0" }}
          component="p"
          variant="body2"
          color={palette.text.tertiary}
          fontSize={".9rem"}
        >
          Experience the magic of winter holidays in the mountains. Hotel On The
          Edge Of The Mountain is an ideal place to relax.
        </Typography>
      </Box>
    </Box>
  );
};

export default Sponsored;
