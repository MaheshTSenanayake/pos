import { Grid, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

const MultiplePayByCard = () => {
  const [cardDetails, setCardDetails] = useState({});

  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    setCardDetails({ ...cardDetails, cardNumber: number });
  };
  const handleCardHolderNameChange = (e) => {
    const name = e.target.value;
    setCardDetails({ ...cardDetails, cardHolderName: name });
  };
  const handleCardTransactionNoChange = (e) => {
    const transactionNumber = e.target.value;
    setCardDetails({ ...cardDetails, cardTransactionNo: transactionNumber });
  };
  const handleCardTypeChange = (e) => {
    const type = e.target.value;
    setCardDetails({ ...cardDetails, cardType: type });
  };
  const handleExpiryMonthChange = (e) => {
    const exMonth = e.target.value;
    setCardDetails({ ...cardDetails, expiryMonth: exMonth });
  };
  const handleExpiryYearChange = (e) => {
    const exYear = e.target.value;
    setCardDetails({ ...cardDetails, expiryYear: exYear });
  };

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
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Card Number"
                  onChange={handleCardNumberChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card holder name"
                  onChange={handleCardHolderNameChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card Transaction No."
                  onChange={handleCardTransactionNoChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Card Type"
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
                  onChange={handleExpiryMonthChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Year"
                  onChange={handleExpiryYearChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MultiplePayByCard;
