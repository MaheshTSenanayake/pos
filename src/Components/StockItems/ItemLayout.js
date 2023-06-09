import styled from "@emotion/styled";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  addItem,
  calculateTotal,
  createNewInvoice,
  updateQuantity,
} from "../../store/action/cartAction.js";
import MediaCard from "./MediaCard";
import moment from "moment";

const useStyle = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ItemLayout() {
  const state = useSelector((state) => state);
  const classes = useStyle();
  const dispatch = useDispatch();
  const now = moment();

  const date = now.format("YYYY/MM/DD");
  const time = now.format("hh:mm:ss A");

  const invoiceData = {
    invoiceId: state.lastOderNumber,
    date: date,
    time: time,
    customerId: 1,
  };

  const height = window.innerHeight;

  const handleAddToCart = (item) => {
    if (state.isNewOrder) {
      dispatch(createNewInvoice(invoiceData));
    }
    if (state.currentInvoice.cartItems.length === 0) {
      dispatch(addItem(item));
      dispatch(calculateTotal());
    } else if (
      state.currentInvoice.cartItems.some(
        (cartItem) => cartItem._id === item._id
      )
    ) {
      const selectedCartItem = state.currentInvoice.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      const updateQuantityData = {
        id: item._id,
        newValue: selectedCartItem.quantity + 1,
      };
      dispatch(updateQuantity(updateQuantityData));
      dispatch(calculateTotal());
    } else {
      dispatch(addItem(item));
      dispatch(calculateTotal());
    }
  };

  const handleSerialInput = (e) => {
    if (e.keyCode === 13) {
      const selectedCartItem = state.stockItems.find(
        (item) => item._id === e.target.value
      );
      handleAddToCart(selectedCartItem);
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        sx={{
          marginTop: "0px",
          padding: "10px",
          maxHeight: `${height}px`,
          overflow: "auto",
        }}
      >
        <Grid item xs={12} sx={{ textAlign: "center", margin: "8px" }}>
          <TextField
            onKeyDown={handleSerialInput}
            InputProps={{
              endAdornment: (
                <SearchIcon sx={{ color: "gray" }} fontSize="small" />
              ),
            }}
            placeholder="Serial"
          />
        </Grid>
        {state.stockItems.map((item) => (
          <Grid item xs={12} sm={6} md={2} key={item._id}>
            <MediaCard item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ItemLayout;
