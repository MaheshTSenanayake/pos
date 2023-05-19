import { Grid, TextField } from "@mui/material";

const MultiplePayByBankTransfer = () => {
  return (
    <Grid container>
      <Grid item xs={10} marginTop="10px">
        <TextField variant="outlined" label="Bank Account Number" fullWidth />
      </Grid>
      <Grid item xs={10} marginTop="10px">
        <TextField
          multiline
          rows={4}
          variant="outlined"
          label="Bank Account Number"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
export default MultiplePayByBankTransfer;
