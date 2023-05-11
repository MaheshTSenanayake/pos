import styled from "@emotion/styled";
import { AddCircleOutline, RemoveCircle } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  updateQuantity,
} from "../../store/action/cartAction";

const useStyles = styled((theme) => ({
  root: {
    "& input": {
      fontSize: "2rem",
    },
  },
}));

function QuantityTextField({ item }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const selectedInvoiceCartItem = state.currentInvoice.cartItems.find(
    (cartItem) => cartItem._id === item._id
  );
  const quantity = selectedInvoiceCartItem.quantity;

  const handleIncrease = () => {
    const updateQuantityData = { id: item._id, newValue: quantity + 1 };
    dispatch(updateQuantity(updateQuantityData));
    dispatch(calculateTotal());
  };

  const handleDecrease = () => {
    const updateQuantityData = { id: item._id, newValue: quantity - 1 };
    dispatch(updateQuantity(updateQuantityData));
    dispatch(calculateTotal());
  };

  const handleTextfieldValueChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    const updateQuantityData = { id: item._id, newValue };
    dispatch(updateQuantity(updateQuantityData));
    dispatch(calculateTotal());
  };

  const classes = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center", width: "160px" }}>
      <InputAdornment position="start">
        <IconButton sx={{ color: "#f35151" }} onClick={handleDecrease}>
          <RemoveCircle />
        </IconButton>
      </InputAdornment>
      <TextField
        size="small"
        className={classes.root}
        value={quantity}
        onChange={handleTextfieldValueChange}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        style={{
          width: "5rem",
        }}
      />
      <InputAdornment position="end">
        <IconButton sx={{ color: "#2ad900" }} onClick={handleIncrease}>
          <AddCircleOutline />
        </IconButton>
      </InputAdornment>
    </div>
  );
}

export default QuantityTextField;
