import { useEffect, useRef } from "react";
import List from "@mui/material/List";
import BusinessHeader from "./BusinessHeader";
import {
  Business,
  BusinessesListProps,
  ReduxState,
} from "../../../utils/interfaces";
import { Box, LinearProgress, ListItem } from "@mui/material";
import ScrollToTheTop from "../../Elements/ScrollToTheTop";
import { useSelector } from "react-redux";
import { setTargetElement } from "../../../store/communication";
import { setSelectedBusiness } from "../../../store/businesses";
import { useAppDispatch } from "../../../store/store";

const BusinessesList = ({ items, scrollRef, loading }: BusinessesListProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const targetElement = useSelector(
    (state: ReduxState) => state.communication.data.targetElement
  );
  const targetRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  // @ts-ignore
  useEffect(() => {
    if (targetElement) {
      dispatch(setSelectedBusiness(targetElement));
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    return () => setTargetElement(null);
  }, [dispatch, targetElement]);

  return (
    <>
      {loading === "loading" ? (
        <LinearProgress />
      ) : (
        <>
          {items.length > 0 ? (
            <List
              sx={{
                width: "100%",
                background: palette.background.primary,
                color: "white",
                padding: 1,
                marginBottom: { xs: "0", md: "-5rem", lg: "-3rem" },
              }}
            >
              {items.map((business: Business) => (
                <BusinessHeader
                  innerRef={business._id === targetElement ? targetRef : null}
                  key={business._id}
                  variant={"list"}
                  business={business}
                />
              ))}
              <ScrollToTheTop
                minLength={5}
                data={items}
                scrollRef={scrollRef}
              />
            </List>
          ) : (
            <Box sx={{ padding: "0 .5rem" }}>
              <ListItem
                sx={{
                  borderRadius: "15px",
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem 1.5rem",
                  alignItems: "flex-start",
                  border: `1px solid ${palette.background.tertiary}`,
                  WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                  boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                  color: palette.text.primary,
                  width: "fit-content",
                }}
              >
                No businesses to display
              </ListItem>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default BusinessesList;
