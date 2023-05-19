import { Grid, TextField } from "@mui/material";

const MultiplePayByCash = () => {
  return (
    <Grid container>
      <Grid item xs={10} sx={{alignContent:"center" }}>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          label="Text Area"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
export default MultiplePayByCash;
