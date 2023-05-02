import { Button, Grid } from "@mui/material";

function CartLayout() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <h3>Order No:</h3>
          </Grid>
          <Grid item xs={3}>
            <Button>Clear</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h4>Oder Items</h4>
      </Grid>
      <Grid item xs={12}>
        <h4>Discount</h4>
      </Grid>
      <Grid item xs={12}>
        <h4>Total</h4>
      </Grid>
      <Grid item xs={12}>
        <Button>Pay</Button>
      </Grid>
    </Grid>
  );
}

export default CartLayout;
