import { Grid } from "@mui/material";
import AmountHandle from "../AmountHandle";
import CartLayout from "./CartLayout";
import CategoryLayout from "./CategoryLayout";
import ItemLayout from "./ItemLayout";

function ThreeColumnLayout() {
  return (
    <Grid container>
      <Grid item xs={4}>
        <CartLayout />
        <AmountHandle />
      </Grid>
      <Grid item xs={1} sx={{ margin: "16px" }}>
        <CategoryLayout />
      </Grid>
      <Grid item xs={6} sx={{ margin: "16px" }}>
        <ItemLayout />
      </Grid>
    </Grid>
  );
}

export default ThreeColumnLayout;
