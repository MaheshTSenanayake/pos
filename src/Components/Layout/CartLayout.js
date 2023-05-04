import { Button, Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function CartLayout() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h3>Order No:</h3>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button
              sx={{
                bgcolor: "#10BADF",
                marginTop: 1,
                borderRadius: 1,
                width: { xs: 180, sm: 100, md: 150 },
              }}
              variant="contained"
              startIcon={<ClearIcon />}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ height: "500px" }}>
        <h4>Oder Items</h4>
      </Grid>
      <Grid item xs={12}>
        <h4>Discount</h4>
      </Grid>
      <Grid item xs={12}>
        <h4>Total</h4>
      </Grid>
      <Grid item xs={12}>
        <h4>Sub Total</h4>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button
          sx={{
            bgcolor: "#10BADF",
            marginTop: 1,
            borderRadius: 1,
            width: { xs: 180, sm: 100, md: 150 },
          }}
          variant="contained"
        >
          Pay
        </Button>
      </Grid>
    </Grid>
  );
}

export default CartLayout;
