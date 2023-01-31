import { useContext, useEffect, useRef } from "react";
import List from "@mui/material/List";
import BusinessHeader from "./BusinessHeader";
import { Business, BusinessesListProps } from "../../utils/interfaces";
import ThemeContext from "../../context/themeContext";
import { Box, ListItem } from "@mui/material";
import CommunicationContext from "../../context/communicationContext";
import BusinessContext from "../../context/businessContext";

const BusinessesList = ({ items }: BusinessesListProps) => {
  const { palette } = useContext(ThemeContext);
  const { targetElement, onSetTargetElement } =
    useContext(CommunicationContext);
  const { onSetSelectedBusiness } = useContext(BusinessContext);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    if (targetElement) {
      onSetSelectedBusiness?.(targetElement);
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    return () => onSetTargetElement?.(null);
  }, [onSetSelectedBusiness, onSetTargetElement, targetElement]);

  return (
    <>
      {items.length > 0 ? (
        <List
          sx={{
            width: "100%",
            background: palette?.background.primary,
            color: "white",
            padding: 1,
            marginBottom: { xs: "0", md: "-5rem", lg: "-3rem" },
            overflow: "scroll",
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
              border: `1px solid ${palette?.background.tertiary}`,
              WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              color: palette?.text.primary,
              width: "fit-content",
            }}
          >
            No businesses to display
          </ListItem>
        </Box>
      )}
    </>
  );
};

export default BusinessesList;
