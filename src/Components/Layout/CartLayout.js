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
import QuantityTextField from "../QuantityTextField";
import {
  calculateTotal,
  clearCart,
  deleteItem,
  updateQuantity,
} from "../../action/cartAction";
import { Button, Grid, Typography } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function CartLayout() {
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
        <Grid item>
          <Typography variant="h6">Order #{state.orderNumber}</Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              textAlign: "center",
              bgcolor: "#f35151",
              borderRadius: 1,
              width: { xs: 180, sm: 100, md: 150 },
            }}
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </Grid>
      </Grid>
      <TableContainer sx={{ height: 500 }}>
        <Table stickyHeader sx={{ minWidth: 460 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="left">UPrice&nbsp;(RS:)</TableCell>
              <TableCell align="left">Price&nbsp;(RS:)</TableCell>
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
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.price * item.quantity}</TableCell>
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
