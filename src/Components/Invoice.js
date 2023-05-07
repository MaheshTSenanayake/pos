import styled from "@emotion/styled";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

import logoImage from "./../logo.png";

const Invoice = ({ amountRecievedValue, handlePdfClose, clearData }) => {
  const state = useSelector((state) => state);
  const paymentValue = parseInt(amountRecievedValue);
  const balance = paymentValue - state.total;

  const today = new Date();
  const date =
    today.getFullYear() +
    "/" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    today.getDate().toString().padStart(2, "0");

  const Container = styled(Grid)({
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    lineHeight: "1.5",
    color: "#333",
    backgroundColor: "white",
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePdfViewClose = () => {
    clearData();
    handlePdfClose();
  };

  return (
    <div>
      <Grid item xs={12}>
        <Button onClick={handlePrint}>Print</Button>
        <Button onClick={handlePdfViewClose}>close</Button>
      </Grid>
      <div ref={componentRef}>
        <Container container spacing={3} padding={2}>
          <Grid item xs={12}>
            <Grid container xs={12} alignItems="center">
              <Grid item xs={6}>
                <img src={logoImage} alt="Logo" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">Invoice</Typography>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={3}>
                    <Typography variant="body2">Invoice ID:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{state.orderNumber}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">Date:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{date}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid container xs={12} sx={{ padding: "10px" }}>
              <Grid item xs={6}>
                <Typography variant="h6">Bill To:</Typography>
                <Typography variant="body2">customerName</Typography>
                <Typography variant="body2">customerAddress</Typography>
                <Typography variant="body2">customerCity</Typography>
                <Typography variant="body2">customerEmail</Typography>
              </Grid>

              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography variant="h6">Bill From:</Typography>
                  <Typography variant="body2">customerName</Typography>
                  <Typography variant="body2">customerAddress</Typography>
                  <Typography variant="body2">customerCity</Typography>
                  <Typography variant="body2">customerEmail</Typography>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid container xs={12} sx={{ padding: "10px" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#98a3a7" }}>
                      <TableCell>Item</TableCell>
                      <TableCell align="left">Unit Price&nbsp;(RS:)</TableCell>
                      <TableCell align="left">Qty</TableCell>
                      <TableCell align="left">Price&nbsp;(RS:)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.cartItems.map((item) => {
                      let totalPrice = item.quantity * item.price;

                      return (
                        <TableRow key={item._id}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{totalPrice.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        total
                      </TableCell>
                      <TableCell>{state.total}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Amount Received
                      </TableCell>
                      <TableCell>{paymentValue.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right" colSpan={3}>
                        Balane
                      </TableCell>
                      <TableCell>{balance.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }}>Thank You</Typography>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Invoice;
