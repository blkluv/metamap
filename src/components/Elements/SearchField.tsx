import { useContext } from "react";
import ThemeContext from "../../context/themeContext";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Event, SearchFieldProps, UserHeader } from "../../utils/interfaces";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  height: "2.3rem",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "15ch",
    },
  },
}));

const SearchField = ({ data, filter, vertical }: SearchFieldProps) => {
  const { palette } = useContext(ThemeContext);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length >= 1) {
      const searchData = e.target.value.trim();
      const newFilter = data?.filter((item: UserHeader | Event) => {
        return item?.[item.type === "event" ? "title" : "name"]
          ?.toLowerCase()
          .includes(searchData.toLowerCase());
      });
      if (searchData === "") {
        filter(null);
      } else {
        filter(newFilter);
      }
    } else {
      filter(null);
    }
  };

  return (
    <Search
      sx={{
        margin: vertical
          ? "0 .5rem 1.5rem 0 !important"
          : ".5rem .5rem 0 0 !important",
        background: palette?.background.tertiary,
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        type="text"
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleFilter}
      />
    </Search>
  );
};

export default SearchField;
