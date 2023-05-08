import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputAdornment, Modal, TextField } from "@mui/material";
import Invoice from "./Invoice";
import {
  calculateTotal,
  clearCart,
  createOderNumber,
} from "../action/cartAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function AmountHandle() {
  const dispstch = useDispatch();
  const state = useSelector((state) => state);
  const [amountRecieved, setAmountReceived] = React.useState();
  const [pdfView, setPdfView] = React.useState(false);
  const [balance, setBalance] = React.useState(0);

  const handleAmountReceivedValue = (e) => {
    const amountRecieved = e.target.value;
    setAmountReceived(amountRecieved);
    setBalance(amountRecieved - state.total);
  };

  const printBill = () => {
    setPdfView(true);
  };
  const handlePdfClose = () => {
    setPdfView(false);
  };
  const clearData = () => {
    setAmountReceived("");
    setBalance(0);
    dispstch(clearCart());
    dispstch(calculateTotal());
    dispstch(createOderNumber());
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
                    bgcolor: "#f35151",
                    borderRadius: 1,
                    width: { xs: 180, sm: 100, md: 150 },
                  }}
                  variant="contained"
                  onClick={printBill}
                >
                  Pay
                </Button>
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
