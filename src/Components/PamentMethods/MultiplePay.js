import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MultiplePayByCheque from "./MultiplePayByCheque";
import React, { useState } from "react";
import MultiplePayByAdvance from "./MultiplePayByAdvance";
import MultiplePayByCash from "./MultiplePayByCash";
import MultiplePayByCard from "./MultiplePayByCard";
import MultiplePayByBankTransfer from "./MultiplePayByBankTransfer";
import { useDispatch, useSelector } from "react-redux";
import { saveDraftInvoice, savePayment } from "../../store/action/cartAction";

const MultiplePay = (props) => {
  const state = useSelector((state) => state);
  const { handleMultiplePayDetailsSubmit } = props;
  const [multiplePyamentList, setMultiplePyamentList] = useState(
    state.currentInvoice.hasOwnProperty("multiplePyamentList")
      ? state.currentInvoice.multiplePyamentList
      : []
  );
  const dispatch = useDispatch();

  const handlePaymentMethodChange = (index, value) => {
    setMultiplePyamentList((prevMethods) => {
      const updatedMethods = [...prevMethods];
      updatedMethods[index].paymentMethod = value;
      return updatedMethods;
    });
  };

  const handleAmountChange = (index, value) => {
    setMultiplePyamentList((prevMethods) => {
      const updatedMethods = [...prevMethods];
      updatedMethods[index].amount = value;
      return updatedMethods;
    });
  };

  const handleAddPaymentMethods = () => {
    setMultiplePyamentList((prevMethods) => [
      ...prevMethods,
      { paymentMethod: "", amount: "" },
    ]);
  };

  const removePyamentMethodHandler = (index) => {
    const updatedPaymentList = [...multiplePyamentList];
    updatedPaymentList.splice(index, 1);
    setMultiplePyamentList(updatedPaymentList);
    const paymentDetails = {
      multiplePyamentList: updatedPaymentList,
      invoiceStatus: { status: "Complete", payMethod: "Multiple" },
    };
    dispatch(savePayment(paymentDetails));
  };
  const methodDetailsSavingHandler = (data) => {
    const selectedObject = multiplePyamentList[data.methodListKey];
    selectedObject.methodDetails = data.methodDetails;
    const paymentDetails = {
      multiplePyamentList: multiplePyamentList,
      invoiceStatus: { status: "Complete", payMethod: "Multiple" },
    };
    dispatch(savePayment(paymentDetails));
  };
  return (
    <div
      style={{
        justifyContent: "center",
        width: "80%",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing={2}
        bgcolor="#ffffff"
        sx={{ padding: "10px" }}
      >
        <Grid container item xs={12} direction="row" alignItems="center">
          <Grid item xs={10} paddingLeft="50px">
            <h1>Multiple Payment</h1>
          </Grid>
          <Grid item xs={2} textAlign="right" paddingRight="50px">
            <IconButton onClick={handleMultiplePayDetailsSubmit}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={9} textAlign="center">
            <Grid container item xs={12} justifyContent="center">
              {multiplePyamentList.map((method, index) => (
                <Grid container item xs={12} key={index}>
                  <Grid item xs={5} padding="10px">
                    <TextField
                      label="Amount"
                      fullWidth
                      value={method.amount}
                      onChange={(e) =>
                        handleAmountChange(index, e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={5} padding="10px">
                    <TextField
                      select
                      label="Payment Method"
                      value={method.paymentMethod}
                      onChange={(e) =>
                        handlePaymentMethodChange(index, e.target.value)
                      }
                      fullWidth
                    >
                      <MenuItem value="Advance">Advance</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Cheque">Cheque</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={2} padding="10px">
                    <IconButton
                      onClick={() => removePyamentMethodHandler(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    {method.paymentMethod === "Advance" && (
                      <MultiplePayByAdvance
                        methodKey={index}
                        sendAdvanceData={methodDetailsSavingHandler}
                      />
                    )}
                    {method.paymentMethod === "Cash" && (
                      <MultiplePayByCash
                        methodKey={index}
                        sendAdvanceData={methodDetailsSavingHandler}
                      />
                    )}
                    {method.paymentMethod === "Cheque" && (
                      <MultiplePayByCheque
                        methodKey={index}
                        sendAdvanceData={methodDetailsSavingHandler}
                      />
                    )}
                    {method.paymentMethod === "Card" && (
                      <MultiplePayByCard
                        methodKey={index}
                        sendAdvanceData={methodDetailsSavingHandler}
                      />
                    )}
                    {method.paymentMethod === "Bank Transfer" && (
                      <MultiplePayByBankTransfer
                        methodKey={index}
                        sendAdvanceData={methodDetailsSavingHandler}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  sx={{
                    textAlign: "center",
                    bgcolor: "#05abeb",
                    borderRadius: 1,
                    margin: 1,
                  }}
                  variant="contained"
                  onClick={handleAddPaymentMethods}
                >
                  Add Pay Method
                </Button>
                <Button
                  sx={{
                    textAlign: "center",
                    bgcolor: "#05abeb",
                    borderRadius: 1,
                    margin: 1,
                  }}
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      saveDraftInvoice({
                        invoiceStatus: {
                          status: "Complete",
                          payMethod: "Multiple",
                        },
                      })
                    )
                  }
                >
                  Finalize
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
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
      </Grid>
    </div>
  );
};
export default MultiplePay;
