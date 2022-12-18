import { useContext } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Search, SearchIconWrapper, StyledInputBase } from "./SocialMenuStyles";

export const SocialMenu = ({ handleFilter, users }: any) => {
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const followers = currentUser?.followers;
  const following = currentUser?.followers;

  const filterData = (e: { target: { value: string } }) => {
    if (e.target.value.length >= 3) {
      const searchData = e.target.value;
      const newFilter = users?.filter((value: any) => {
        return value.name.toLowerCase().includes(searchData.toLowerCase());
      });
      if (searchData === "") {
        handleFilter([]);
      } else {
        handleFilter(newFilter);
      }
    } else {
      handleFilter([]);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: palette?.background.primary,
        color: palette?.text.tertiary,
      }}
    >
      <CardContent
        sx={{
          padding: "8px 8px 0 8px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Social
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "0.5rem",
            marginBottom: "-0.5rem",
            fontWeight: "bold",
          }}
        >
          Filters
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Search
          sx={{
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            background: palette?.background.tertiary,
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={filterData}
          />
        </Search>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          disableElevation
          sx={{
            color: palette?.text.primary,
            background: palette?.background.tertiary,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
        >
          Suggested
        </Button>
        <Button
          // @ts-ignore
          onClick={() => handleFilter([...following])}
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
        >
          Following
        </Button>
        <Button
          onClick={() => handleFilter([...followers])}
          variant="outlined"
          startIcon={<VisibilityIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette?.green,
          }}
        >
          Followers
        </Button>
      </CardActions>
    </Box>
  );
};

export default SocialMenu;
