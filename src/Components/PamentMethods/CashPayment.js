import {
  Grid,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../../store/action/cartAction";

const CashPayment = (props) => {
  const { handleCashDetailsSubmit } = props;

  const [cashDetails, setCashDetails] = useState({
    amountRecieve: "",
    paymentNote: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setCashDetails({ ...cashDetails, amountRecieve: amount });
  };
  const handlePaynemtNoteChange = (e) => {
    const paymentNote = e.target.value;
    setCashDetails({ ...cashDetails, paymentNote: paymentNote });
  };
  const submitCashDetails = () => {
    const updatedCashDetails = {
      ...cashDetails,
      invoiceStatus: { status: "Complete", payMethod: "Cash" },
    };
    dispatch(savePayment(updatedCashDetails));
    handleCashDetailsSubmit(); 
  };

  return (
    <div>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <IconButton
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={handleCashDetailsSubmit}
            >
              <CloseIcon />
            </IconButton>
            <h1>Cash Payment</h1>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Amount"
                      value={
                        state.currentInvoice.hasOwnProperty("cashDetails")
                          ? state.currentInvoice.cashDetails.amountRecieve
                          : cashDetails.amountRecieve
                      }
                      fullWidth
                      onChange={handleAmountChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Payment Note"
                      value={
                        state.currentInvoice.hasOwnProperty("cashDetails")
                          ? state.currentInvoice.cashDetails.paymentNote
                          : cashDetails.paymentNote
                      }
                      fullWidth
                      onChange={handlePaynemtNoteChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={submitCashDetails}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: "#04FFF6",
                    borderRadius: "10px",
                    position: "sticky",
                    top: "50px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100px",
                      justifyContent: "center",
                    }}
                    color={"white"}
                  >
                    <Typography variant="subtitle1">
                      <strong>Total Payable:</strong>
                    </Typography>
                    <Typography variant="h5">
                      {state.currency + ": "}
                      {state.currency === "LKR"
                        ? state.currentInvoice.total.lkr
                        : state.currentInvoice.total.usd}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100px",
                      justifyContent: "center",
                    }}
                    color={"white"}
                  >
                    <Typography variant="subtitle1">
                      <strong>Total Paying:</strong>
                    </Typography>
                    <Typography variant="h5">
                      {state.currency + ": "}
                      {state.currentInvoice.recieveAmount}
                    </Typography>
                    <input type="hidden" id="total_paying_input" value="8.00" />
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100px",
                      justifyContent: "center",
                    }}
                    color={"white"}
                  >
                    <Typography variant="subtitle1">
                      <strong>Balance:</strong>
                    </Typography>
                    <Typography variant="h5">
                      {state.currency + ": "}
                      {state.currentInvoice.balance}
                    </Typography>
                    <input type="hidden" id="in_balance_due" value="0.00" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CashPayment;
