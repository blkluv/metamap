import { useContext } from "react";
import List from "@mui/material/List";
import BusinessHeader from "./BusinessHeader";
import { Business, BusinessesListProps } from "../../utils/interfaces";
import ThemeContext from "../../context/themeContext";
import { ListItem } from "@mui/material";

const BusinessesList = ({ items }: BusinessesListProps) => {
  const { palette } = useContext(ThemeContext);

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
              key={business._id}
              variant={"list"}
              business={business}
            />
          ))}
        </List>
      ) : (
        <ListItem
          sx={{
            borderRadius: "15px",
            background: palette?.background.tertiary,
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            padding: "1rem 1.5rem",
            alignItems: "flex-start",
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            color: palette?.text.primary,
          }}
        >
          No businesses to display
        </ListItem>
      )}
    </>
  );
};

export default BusinessesList;
