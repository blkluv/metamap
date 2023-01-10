import { useState, useContext } from "react";
import { Box } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import UserContext from "../../context/userContext";
import MUIRating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { RatingProps } from "../../utils/interfaces";
import { notify } from "../../utils/notifications";

const Rating = ({
  rating: { rates, ratesNumber, average },
  handleRate,
  readOnly,
  margin,
}: RatingProps) => {
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [hover, setHover] = useState(-1);

  const labels: { [index: string]: string } = {
    0: " ",
    1: "Bad",
    2: "Poor",
    3: "Average",
    4: "Good",
    5: "Very Good",
  };

  const getLabelText = (value: number) => {
    const roundedValue = Math.round(value);
    return `${roundedValue} Star${roundedValue !== 1 ? "s" : ""}, ${
      labels[roundedValue]
    }`;
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    if (currentUser?.name.startsWith("guest")) {
      notify("DEMO users cannot rate.");
      return;
    }

    if (rates.find((user) => user._id === currentUser?._id)) {
      notify("You have already rated.");
      return;
    }
    if (hover) {
      handleRate?.(hover);
      setHover(-1);
    }
  };

  const checkIfReadOnly = () => {
    if (rates.find((user) => user._id === currentUser?._id)) return true;
    if (readOnly) return true;
    return false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: margin ? margin : "1rem 0 0 0",
        flexWrap: "wrap",
        color: palette?.text.tertiary,
      }}
    >
      <MUIRating
        name="hover-feedback"
        readOnly={readOnly || checkIfReadOnly()}
        value={Math.round(average)}
        size={"small"}
        getLabelText={getLabelText}
        onClick={(e) => handleClick(e)}
        // @ts-ignore
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {!checkIfReadOnly() ? (
        <Box sx={{ ml: 1, fontSize: ".8rem" }}>
          {hover !== -1
            ? labels[hover !== -1 ? hover : 2]
            : labels[Math.round(average)]}
        </Box>
      ) : (
        <Box sx={{ ml: 1, fontSize: ".8rem" }}>
          {labels[Math.round(average)]}
        </Box>
      )}
      {ratesNumber ? (
        <Box
          sx={{
            ml: 1,
            fontSize: ".7rem",
            color: palette?.text.primary,
          }}
        >{`(${ratesNumber} review${ratesNumber !== 1 ? "s" : ""})`}</Box>
      ) : null}
    </Box>
  );
};

export default Rating;
