import { Grid, IconButton, TextField, MenuItem, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../../store/action/cartAction";

const CardPayment = (props) => {
  const state = useSelector((state) => state.currentInvoice);
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardTransactionNo, setCardTransactionNo] = useState("");
  const [cardType, setCardType] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, esetExpiryYear] = useState("");

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };
  const handleCardHolderNameChange = (e) => {
    setCardHolderName(e.target.value);
  };
  const handleCardTransactionNoChange = (e) => {
    setCardTransactionNo(e.target.value);
  };
  const handleCardTypeChange = (e) => {
    setCardType(e.target.value);
  };
  const handleExpiryMonthChange = (e) => {
    setExpiryMonth(e.target.value);
  };
  const handleExpiryYearChange = (e) => {
    esetExpiryYear(e.target.value);
  };

  const cardDetails = {
    cardNumber: cardNumber,
    cardHolderName: cardHolderName,
    cardTransactionNo: cardTransactionNo,
    cardType: cardType,
    expiryMonth: expiryMonth,
    expiryYear: expiryYear,
    invoiceStatus: { status: "Complete", payMethod: "Card" },
  };
  const submitHandler = () => {
    dispatch(savePayment(cardDetails));
    handleCardDetailsSubmit();
  };

  const { handleCardDetailsSubmit } = props;

  return (
    <div>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={6}>
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
              onClick={handleCardDetailsSubmit}
            >
              <CloseIcon />
            </IconButton>
            <h1>Card Payment</h1>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Card Number"
                  value={
                    state.hasOwnProperty("cardDetails")
                      ? state.cardDetails.cardNumber
                      : cardNumber
                  }
                  onChange={handleCardNumberChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card holder name"
                  value={
                    state.hasOwnProperty("cardDetails")
                      ? state.cardDetails.cardHolderName
                      : cardHolderName
                  }
                  onChange={handleCardHolderNameChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card Transaction No."
                  value={
                    state.hasOwnProperty("cardDetails")
                      ? state.cardDetails.cardTransactionNo
                      : cardTransactionNo
                  }
                  onChange={handleCardTransactionNoChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Card Type"
                  value={
                    state.hasOwnProperty("cardDetails")
                      ? state.cardDetails.cardType
                      : cardType
                  }
                  onChange={handleCardTypeChange}
                  fullWidth
                >
                  <MenuItem value="Visa">Visa</MenuItem>
                  <MenuItem value="Mastercard">Mastercard</MenuItem>
                  <MenuItem value="American Express">American Express</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Month"
                  value={
                    state.hasOwnProperty("cardDetails")
                      ? state.cardDetails.expiryMonth
                      : expiryMonth
                  }
                  onChange={handleExpiryMonthChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Year"
                  value={
                    state.hasOwnProperty("cardDetails")
                      ? state.cardDetails.expiryYear
                      : expiryYear
                  }
                  onChange={handleExpiryYearChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={submitHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CardPayment;
