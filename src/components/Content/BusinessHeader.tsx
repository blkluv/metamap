import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import BusinessContext from "../../context/businessContext";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import { BusinessHeader as Header } from "../../utils/interfaces";
import { Box, CardMedia } from "@mui/material";
import debounce from "../../utils/debounce";
import preview from "../../images/preview.png";
import { notify } from "../../utils/notifications";
import EventContext from "../../context/eventContext";
import Rating from "../Elements/Rating";
import ConfirmationDialog from "../Elements/ConfirmationDialog";
import {
  FavoriteBorder,
  PhoneAndroid,
  AlternateEmail,
  RemoveCircleOutline,
  Favorite,
  Home,
  Language,
} from "@mui/icons-material";

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
  const {
    selectedBusiness,
    onSetSelectedBusiness,
    onLikeBusiness,
    onRateBusiness,
    onDeleteBusiness,
  } = useContext(BusinessContext);
  const { onRemoveSelectedEvent } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLikeBusiness = () => {
    if (currentUser?.name.startsWith("guest")) {
      notify("DEMO users cannot like anything.");
      return;
    }
    if (creator?._id === currentUser?._id) {
      notify("You can't like your own business.");
      return;
    }
    onLikeBusiness?.(_id);
  };

  const handleSelect = () => {
    onRemoveSelectedEvent?.();
    onSetSelectedBusiness?.(_id);
  };

  const handleRate = (newRating: number) => {
    if (creator?._id === currentUser?._id) {
      notify("You can't rate your own business.");
    } else {
      onRateBusiness?.(_id, newRating);
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = async () => {
    await onDeleteBusiness?.(_id);
    setIsOpen(false);
  };

  return (
    <ListItem
      ref={innerRef}
      alignItems="flex-start"
      sx={{
        cursor: "pointer",
        borderRadius: "15px",
        background: popup
          ? `${palette?.background.tertiary} !important`
          : palette?.background.tertiary,
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
          <Typography
            component="h3"
            variant="h6"
            color={palette?.text.tertiary}
          >
            Business
          </Typography>
          {currentUser?._id === creator?._id ? (
            <RemoveCircleOutline
              sx={{
                cursor: "pointer",
                color: palette?.text.primary,
                fontSize: "1.2rem",
              }}
              onClick={() => handleOpenDialog()}
            />
          ) : null}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  color: palette?.text.primary,
                }}
              >
                <Typography
                  sx={{ display: "block", fontWeight: "500", mb: ".5rem" }}
                  component="span"
                  variant="body2"
                  color={palette?.text.tertiary}
                  fontSize={"1rem"}
                >
                  {name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  color: palette?.text.tertiary,
                }}
              >
                <Typography
                  sx={{ display: "block", marginRight: ".3rem" }}
                  component="span"
                  variant="body2"
                  fontSize={".9rem"}
                >
                  {likes?.length ? likes.length : ""}
                </Typography>
                {likes?.find((user) => user._id === currentUser?._id) ? (
                  <Favorite
                    sx={{
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      color: palette?.warning,
                    }}
                    onClick={debounce(() => handleLikeBusiness(), 400)}
                  />
                ) : (
                  <FavoriteBorder
                    sx={{ fontSize: "1.2rem", cursor: "pointer" }}
                    onClick={debounce(() => handleLikeBusiness(), 400)}
                  />
                )}
              </Box>
            </Box>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
              fontSize={".8rem"}
            >
              Owners:{" "}
              <NavLink
                to={`/dashboard/profile/${creator?.name}`}
                style={{
                  textDecoration: "none",
                  color: palette?.text.tertiary,
                  fontWeight: "bold",
                }}
              >
                {creator?.name}
              </NavLink>
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              sx={{
                display: "block",
                marginTop: "0.2rem",
                fontSize: ".8rem",
                mb: ".8rem",
              }}
              component="span"
              variant="body2"
              color={palette?.text.primary}
            >
              {`Opening time: ${openingtime}`}
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginTop: "0.2rem",
                marginBottom: ".8rem",
                fontSize: ".8rem",
                flexWrap: "wrap",
              }}
              color={palette?.text.primary}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: ".1rem .7rem .3rem 0",
                }}
              >
                <Home
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />
                {`${address}`}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: ".1rem .7rem .3rem 0",
                }}
              >
                <PhoneAndroid
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />{" "}
                {`${contact?.phone}`}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: ".1rem .7rem .3rem 0",
                }}
              >
                <AlternateEmail
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />{" "}
                {`${contact?.email}`}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: ".1rem .7rem .3rem 0",
                }}
              >
                <Language
                  sx={{
                    fontSize: "1.2rem",
                    marginRight: ".2rem",
                  }}
                />{" "}
                {`${contact?.website}`}
              </Box>
            </Box>
            <Typography
              sx={{
                display: "block",
                color: palette?.text.tertiary,
                margin: "0.5rem 0 0.8rem 0",
                fontSize: ".9rem",
              }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
            {rating ? <Rating rating={rating} handleRate={handleRate} /> : null}
          </>
        }
      />
      <ConfirmationDialog
        title={"Delete this business?"}
        confirmLabel={"delete"}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </ListItem>
  );
};

export default BusinessHeader;
