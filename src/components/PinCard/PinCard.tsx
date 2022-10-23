import { Typography } from "@mui/material";

const PinCard = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {new Date().getFullYear()}
    </Typography>
  );
};

export default PinCard;
