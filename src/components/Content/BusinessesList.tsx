import { useContext } from "react";
import List from "@mui/material/List";
import BusinessHeader from "./BusinessHeader";
import { Business, BusinessesListProps } from "../../utils/interfaces";
import ThemeContext from "../../context/themeContext";

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
        <p>No businesses to display.</p>
      )}
    </>
  );
};

export default BusinessesList;
