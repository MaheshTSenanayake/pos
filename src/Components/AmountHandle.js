import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputAdornment, Modal, TextField } from "@mui/material";
import Invoice from "./Layout/print/Invoice";
import {
  calculateTotal,
  clearCart,
  createOderNumber,
  saveDraftInvoice,
} from "../action/cartAction";
import moment from "moment";
import InvoiceTabList from "./Layout/InvoiceTabList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function AmountHandle() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [amountRecieved, setAmountReceived] = React.useState("");
  const [pdfView, setPdfView] = React.useState(false);
  const [balance, setBalance] = React.useState(0);

  const handleAmountReceivedValue = (e) => {
    const amountRecieved = e.target.value;
    setAmountReceived(amountRecieved);
    state.currency === "LKR"
      ? setBalance(amountRecieved - state.total.lkr)
      : setBalance(amountRecieved - state.total.usd);
  };

  const handlePdfClose = () => {
    setPdfView(false);
  };
  const clearData = () => {
    setAmountReceived("");
    setBalance(0);
    dispatch(clearCart());
    dispatch(calculateTotal());
    dispatch(createOderNumber());
  };

  const now = moment();
  const date = now.format("YYYY/MM/DD");
  const time = now.format("hh:mm:ss A");

  const invoiceData = {
    invoiceId: state.orderNumber,
    date: date,
    time: time,
    customerId: 1,
    currency: state.currency,
    purchaseItems: state.cartItems,
    total: state.currency === "LKR" ? state.total.lkr : state.total.usd,
    amountRecieved: amountRecieved,
    balance: balance,
  };

  const printBill = (invoiceData) => {
    invoiceData.invoiceStatus = { status: "Complete", payMethod: "Complete" };
    dispatch(saveDraftInvoice(invoiceData));
    setPdfView(true);
  };

  const saveInvoiceData = (invoiceData) => {
    invoiceData.invoiceStatus = { status: "Drafts", payMethod: "notDefine" };
    dispatch(saveDraftInvoice(invoiceData));
    dispatch(createOderNumber());
  };
  const saveCreditInvoice = (invoiceData) => {
    invoiceData.invoiceStatus = { status: "Complete", payMethod: "Credit" };
    dispatch(saveDraftInvoice(invoiceData));
    dispatch(createOderNumber());
  };

  return (
    <div>
      {
        <Box sx={{ flexGrow: 1, marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    Total
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      value={
                        state.currency === "LKR"
                          ? state.total.lkr
                          : state.total.usd
                      }
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {state.currency}:
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Item>
              <Item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    Amount Received
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      value={amountRecieved}
                      onChange={handleAmountReceivedValue}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {state.currency}:
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ height: "100%" }}>
                <Grid container direction="column" alignItems="center">
                  <Grid item>Balane</Grid>
                  <Grid item>
                    <TextField
                      value={balance.toFixed(2)}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {state.currency}:
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ textAlign: "center" }}>
                <Button
                  sx={{
                    textAlign: "center",
                    bgcolor: "#7ccb41",
                    borderRadius: 1,
                    width: { xs: 180, sm: 100, md: 150 },
                    margin: 2,
                  }}
                  variant="contained"
                  onClick={() => printBill(invoiceData)}
                >
                  Pay
                </Button>
                <Button
                  sx={{
                    textAlign: "center",
                    bgcolor: "#00a4bf",
                    borderRadius: 1,
                    width: { xs: 180, sm: 100, md: 150 },
                    margin: 2,
                  }}
                  variant="contained"
                  onClick={() => saveInvoiceData(invoiceData)}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    textAlign: "center",
                    bgcolor: "#9b9b9b",
                    borderRadius: 1,
                    width: { xs: 180, sm: 100, md: 150 },
                    margin: 2,
                  }}
                  variant="contained"
                  onClick={() => saveCreditInvoice(invoiceData)}
                >
                  Credit Sale
                </Button>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ textAlign: "center" }}>
                <InvoiceTabList />
              </Item>
            </Grid>
          </Grid>
        </Box>
      }
      {
        <Modal open={pdfView} onClose={handlePdfClose}>
          <div
            style={{
              width: "1000px",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Invoice
              amountRecievedValue={amountRecieved}
              handlePdfClose={handlePdfClose}
              clearData={clearData}
            />
          </div>
        </Modal>
      }
    </div>
  );
}

export default AmountHandle;
