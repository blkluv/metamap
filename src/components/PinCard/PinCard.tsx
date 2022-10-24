import { Box, Button, TextField, Typography } from "@mui/material";

const PinCard = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      title: data.get("title"),
      description: data.get("description"),
    });
  };

  return (
    <Box sx={{ ml: 1, mr: 1 }}>
      <Typography component="h3" variant="h6">
        New event
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          variant="standard"
          multiline={true}
          margin="dense"
          maxRows={2}
          required
          inputProps={{ maxLength: 45 }}
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <TextField
          variant="standard"
          multiline={true}
          margin="dense"
          maxRows={5}
          inputProps={{ maxLength: 800 }}
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default PinCard;
