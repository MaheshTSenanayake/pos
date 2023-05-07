import styled from "@emotion/styled";
import { AddCircleOutline, RemoveCircle } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = styled((theme) => ({
  root: {
    "& input": {
      fontSize: "2rem",
    },
  },
}));

function QuantityTextField({ item, onQuantityChange }) {
  const state = useSelector((state) => state.cartItems);

  const selectedCartItem = state.find((cartItem) => cartItem._id === item._id);
  const quantity = selectedCartItem ? selectedCartItem.quantity : 0;

  const handleIncrease = () => {
    const updateQuantityData = { id: item._id, newValue: quantity + 1 };
    onQuantityChange(updateQuantityData);
  };

  const handleDecrease = () => {
    const updateQuantityData = { id: item._id, newValue: quantity - 1 };
    onQuantityChange(updateQuantityData);
  };

  const handleTextfieldValueChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    onQuantityChange(item._id, newValue);
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
