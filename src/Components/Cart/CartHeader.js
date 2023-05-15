import { Button, Grid, TextField, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrency,
  createOderNumber,
} from "../../store/action/cartAction";

const CartHeader = () => {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("USD");
  const state = useSelector((state) => state);

  const handleCreateNewInvoice = () => {
    dispatch(createOderNumber());
  };
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ p: 2, bgcolor: "#ffffff" }}
    >
      <Grid item xs={2}>
        <Typography variant="p">
          Order #
          {state.isNewOrder ? state.lastOderNumber : state.orderNumber}
        </Typography>
      </Grid>
      <Grid item xs={5.5} sx={{ textAlign: "center" }}>
        <TextField
          size="small"
          label="Mobile Number"
          type="search"
          variant="standard"
        />
      </Grid>
      <Grid item xs={3} sx={{ textAlign: "center" }}>
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#0021c5",
            borderRadius: 1,
            width: "120px",
          }}
          variant="contained"
          size="small"
          startIcon={<AddBoxIcon />}
          onClick={handleCreateNewInvoice}
        >
          New
        </Button>
      </Grid>
      <Grid item xs={1.5} sx={{ textAlign: "right" }}>
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#10BADF",
            borderRadius: 1,
          }}
          variant="contained"
          size="small"
          onClick={() => {
            currency === "LKR" ? setCurrency("USD") : setCurrency("LKR");
            dispatch(changeCurrency(currency));
          }}
        >
          {currency}
        </Button>
      </Grid>
    </Grid>
  );
};
export default CartHeader;
