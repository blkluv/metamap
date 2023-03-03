import { Check, Edit } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../../store/currentUser";
import { useAppDispatch } from "../../../store/store";
import { ReduxState, UserHeader } from "../../../utils/interfaces";

interface DescriptionProps {
  user?: UserHeader;
}

const Description = ({ user }: DescriptionProps) => {
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const {
    register: registerDescription,
    handleSubmit: handleRegisterDescription,
    reset: resetDescription,
  } = useForm({
    defaultValues: {
      description: null,
    },
  });

  const handleSubmitDescription = async (data: {
    description: string | null;
  }) => {
    const description = data.description?.trim();
    if (description) {
      try {
        dispatch(
          updateUser({
            dataType: "description",
            data: String(description),
          })
        );
      } catch (err) {}
    }
    resetDescription();
    setEditDescription(!editDescription);
  };

  return (
    <>
      {currentUser.name === id ? (
        <>
          {editDescription ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box component="form">
                <TextField
                  placeholder="Write something about yourself..."
                  variant="standard"
                  multiline={true}
                  size="small"
                  margin="dense"
                  maxRows={3}
                  InputProps={{ disableUnderline: true }}
                  inputProps={{ style: { color: palette.text.primary } }}
                  fullWidth
                  id="userDescription"
                  autoComplete="userDescription"
                  autoFocus
                  {...registerDescription("description", {
                    minLength: 3,
                    maxLength: 800,
                  })}
                />
              </Box>
              <Check
                sx={{
                  cursor: "pointer",
                  opacity: "0.8",
                  color: "yellowgreen",
                  borderRadius: "50%",
                  border: "1px solid yellowgreen",
                  padding: "0 .1rem",
                  marginTop: ".5rem",
                }}
                onClick={handleRegisterDescription(
                  debounce(handleSubmitDescription, 400)
                )}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="div"
                onClick={() => setEditDescription(true)}
              >
                {user?.description
                  ? user.description
                  : "Write something about yourself..."}
              </Typography>
              <Edit
                sx={{
                  padding: "0 .1rem",
                  marginTop: ".5rem",
                  cursor: "pointer",
                }}
                onClick={() => setEditDescription(!editDescription)}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography component="div">{user?.description}</Typography>
      )}
    </>
  );
};

export default Description;
