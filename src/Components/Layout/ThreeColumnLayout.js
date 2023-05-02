import { Grid } from "@mui/material";
import CartLayout from "./CartLayout";
import CategoryLayout from "./CategoryLayout";
import ItemLayout from "./ItemLayout";

function ThreeColumnLayout() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <CartLayout />
      </Grid>
      <Grid item xs={1}>
        <CategoryLayout />
      </Grid>
      <Grid item xs={8}>
        <ItemLayout />
      </Grid>
    </Grid>
  );
}

export default ThreeColumnLayout;
