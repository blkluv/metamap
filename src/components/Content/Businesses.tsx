import { useContext, useEffect } from "react";
import List from "@mui/material/List";
import { Business } from "../../utils/interfaces";
import BusinessContext from "../../context/businessContext";
import { Box, Divider } from "@mui/material";
import ThemeContext from "../../context/themeContext";
import BusinessHeader from "./BusinessHeader";
import BusinessMenu from "../Navigation/BusinessMenu";

const Businesses = () => {
  const { businesses, onRemoveSelectedBusiness } = useContext(BusinessContext);
  const { palette } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      onRemoveSelectedBusiness?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <BusinessMenu />
      <Divider
        variant="middle"
        sx={{ background: "rgb(120,120,126)", margin: "1rem 0 1.5rem 0" }}
      />
      {businesses.length > 0 ? (
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
          {businesses.map((business: Business) => (
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
    </Box>
  );
};

export default Businesses;
