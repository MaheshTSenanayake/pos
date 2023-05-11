import { Grid } from "@mui/material";
import CategoryLayout from "../CategoryComponents/CategoryLayout";
import CartHeader from "../Cart/CartHeader";
import ItemLayout from "../StockItems/ItemLayout";
import ItemTable from "../Cart/ItemTable";
import AmountHandle from "../Cart/AmountHandle";
import InvoiceSubmitionBuutons from "../ActionButtons/InvoiceSubmitionButtons";

function PosSystemHomeLayout() {
  return (
    <Grid container>
      <Grid item xs={4}>
        <CartHeader />
        <ItemTable />
        <AmountHandle />
        <InvoiceSubmitionBuutons />
      </Grid>
      <Grid item xs={1}>
        <CategoryLayout />
      </Grid>
      <Grid item xs={7}>
        <ItemLayout />
      </Grid>
    </Grid>
  );
}

export default PosSystemHomeLayout;
