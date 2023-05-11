import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  calculateTotal,
  changeCurrency,
  clearCart,
  deleteItem,
  updateQuantity,
} from "../../store/action/cartAction.js";
import { Button, Grid, TextField, Typography } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useState } from "react";
import QuantityTextField from "../TextFields/QuantityTextField.js";

function CartLayout() {
  const [currency, setCurrency] = useState("USD");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleChangeQuantity = (quantity) => {
    let value = isNaN(quantity.newValue) ? 0 : quantity.newValue;
    const updateQuantityData = { id: quantity.id, newValue: value };
    dispatch(updateQuantity(updateQuantityData));
    dispatch(calculateTotal());
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(calculateTotal());
  };
  const handleRemoveItemFromCart = (id) => {
    dispatch(deleteItem(id));
    dispatch(calculateTotal());
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Grid item xs={2}>
          <Typography variant="p">Order #{state.orderNumber}</Typography>
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
              bgcolor: "#f35151",
              borderRadius: 1,
            }}
            variant="contained"
            size="small"
            startIcon={<ClearIcon />}
            onClick={handleClearCart}
          >
            Clear Cart
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
      <TableContainer sx={{ height: 500 }}>
        <Table stickyHeader sx={{ minWidth: 460 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="left">UPrice&nbsp;({state.currency})</TableCell>
              <TableCell align="left">Price&nbsp;({state.currency})</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: "300px", overflow: "auto" }}>
            {state.cartItems.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">
                  <QuantityTextField
                    item={item}
                    onQuantityChange={handleChangeQuantity}
                  />
                </TableCell>
                <TableCell align="left">
                  {state.currency === "LKR"
                    ? item.price.lkr.toFixed(2)
                    : item.price.usd.toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  {state.currency === "LKR"
                    ? (item.price.lkr * item.quantity).toFixed(2)
                    : (item.price.usd * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  <HighlightOffRoundedIcon
                    sx={{ color: "#f35151" }}
                    onClick={() => handleRemoveItemFromCart(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CartLayout;
