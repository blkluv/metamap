import { Button, ListItem } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { ReduxState, ScrollToTheTopProps } from "../../utils/interfaces";
import { useSelector } from "react-redux";

const ScrollToTheTop = ({
  data,
  scrollRef,
  minLength,
}: ScrollToTheTopProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <>
      {data.length > minLength ? (
        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<KeyboardDoubleArrowUpIcon />}
            disableElevation
            sx={{
              color: palette.text.primary,
              background: palette.background.tertiary,
              marginLeft: "0 !important",
              marginRight: "0.5rem !important",
              marginTop: "0.5rem !important",
            }}
            onClick={() =>
              scrollRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Top
          </Button>
        </ListItem>
      ) : null}
    </>
  );
};

export default ScrollToTheTop;
