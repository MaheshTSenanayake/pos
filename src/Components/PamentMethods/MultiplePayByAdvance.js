import { Grid, TextField } from "@mui/material";

const MultiplePayByAdvance = () => {
  return (
    <Grid container>
      <Grid item xs={10} sx={{ alignContent: "center" }}>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          label="Payment Note"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
export default MultiplePayByAdvance;
