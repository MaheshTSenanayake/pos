import { Grid, TextField } from "@mui/material";

const MultiplePayByCheque = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} marginTop="10px">
        <TextField variant="outlined" label="Cheque Number" fullWidth />
      </Grid>
      <Grid item xs={10} marginTop="10px">
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
export default MultiplePayByCheque;
