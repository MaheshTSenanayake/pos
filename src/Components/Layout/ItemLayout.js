import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  calculateTotal,
  updateQuantity,
} from "../../action/cartAction";
import MediaCard from "./MediaCard";
const data = require("../../data.json");

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

  const height = window.innerHeight;

  const handleAddToCart = (item) => {
    if (state.cartItems.some((cartItem) => cartItem._id === item._id)) {
      const selectedCartItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      const newQuantity = selectedCartItem.quantity + 1;
      const updateQuantityData = { id: item._id, newValue: newQuantity };
      dispatch(updateQuantity(updateQuantityData));
      dispatch(calculateTotal());
    } else {
      item.quantity = 1;
      dispatch(addItem(item));
      dispatch(calculateTotal());
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "0px",
          padding: "10px",
          maxHeight: `${height}px`,
          overflow: "auto",
        }}
      >
        {data.items.map((item) => (
          <Grid item xs={12} sm={6} md={2} key={item._id}>
            <MediaCard item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ItemLayout;
