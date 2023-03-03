import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {
  BusinessHeader as Header,
  ReduxState,
} from "../../../utils/interfaces";
import { Box, CardMedia } from "@mui/material";
import preview from "../../../images/preview.png";
import { useSelector } from "react-redux";
import { setSelectedBusiness } from "../../../store/businesses";
import { useAppDispatch } from "../../../store/store";
import { removeSelectedEvent } from "../../../store/events";
import Like from "./Like";
import Delete from "./Delete";
import Contact from "./Contact";
import Rate from "./Rate";
import Title from "./Title";
import Creator from "./Creator";

const BusinessHeader = ({
  business: {
    _id,
    name,
    contact,
    creator,
    address,
    likes,
    rating,
    description,
    openingtime,
    logo,
  },
  variant,
  popup,
  innerRef,
}: Header) => {
  const { selectedBusiness } = useSelector(
    (state: ReduxState) => state.businesses.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(removeSelectedEvent());
    dispatch(setSelectedBusiness(_id));
  };

  return (
    <ListItem
      ref={innerRef}
      alignItems="flex-start"
      sx={{
        width: variant === "list" ? "100%" : "fit-content",
        cursor: "pointer",
        borderRadius: "15px",
        background: popup
          ? `${palette.background.tertiary} !important`
          : palette.background.tertiary,
        marginBottom: popup ? 0 : "1rem",
        display: "flex",
        flexDirection:
          variant === "list" ? { xs: "column", sm: "row" } : { xs: "column" },
        justifyContent: "center",
        alignItems: "flex-start",
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        "&:last-child": {
          marginBottom: variant === "list" ? "2.5rem" : "0",
        },
      }}
      selected={_id === selectedBusiness?._id}
      onClick={() => (variant === "list" ? handleSelect() : null)}
    >
      {variant === "masonry" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h3" variant="h6" color={palette.text.tertiary}>
            Business
          </Typography>
          <Delete creator={creator} businessId={_id} />
        </Box>
      ) : null}
      <CardMedia
        component="img"
        sx={{
          height:
            variant === "list"
              ? { xs: "100%", sm: 155 }
              : { xs: "100%", sm: "100%", md: "100%" },
          width: variant === "list" ? { xs: "100%", sm: 155 } : { xs: "100%" },
          borderRadius: "10px",
          marginRight: variant === "list" ? "1rem" : { sm: "1rem", md: 0 },
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        image={logo ? logo : preview}
        alt="Business logo"
      />
      <ListItemText
        disableTypography
        primary={
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Title name={name} />
              <Like likes={likes} creator={creator} businessId={_id} />
            </Box>
            <Creator creator={creator} />
          </>
        }
        secondary={
          <>
            <Contact
              contact={contact}
              address={address}
              openingtime={openingtime}
            />
            <Typography
              sx={{
                display: "block",
                color: palette.text.tertiary,
                margin: "0.5rem 0 0.8rem 0",
                fontSize: ".9rem",
              }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
            <Rate rating={rating} creator={creator} _id={_id} />
          </>
        }
      />
    </ListItem>
  );
};

export default BusinessHeader;
