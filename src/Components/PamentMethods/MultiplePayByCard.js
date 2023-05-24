import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const MultiplePayByCard = (props) => {
  const [cardDetails, setCardDetails] = useState({});
  const state = useSelector((state) => state.currentInvoice);

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

  const saveAdvancePaymetData = () => {
    const sendingCardData = {
      ...cardDetails,
      methodDetails: cardDetails,
      methodListKey: props.methodKey,
    };
    props.sendAdvanceData(sendingCardData);
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
                  value={
                    state.hasOwnProperty("multiplePyamentList") &&
                    props.methodKey < state.multiplePyamentList.length
                      ? state.multiplePyamentList[props.methodKey].methodDetails
                          .cardNumber
                      : cardDetails.cardNumber
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card holder name"
                  onChange={handleCardHolderNameChange}
                  fullWidth
                  value={
                    state.hasOwnProperty("multiplePyamentList") &&
                    props.methodKey < state.multiplePyamentList.length
                      ? state.multiplePyamentList[props.methodKey].methodDetails
                          .cardHolderName
                      : cardDetails.cardHolderName
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card Transaction No."
                  onChange={handleCardTransactionNoChange}
                  fullWidth
                  value={
                    state.hasOwnProperty("multiplePyamentList") &&
                    props.methodKey < state.multiplePyamentList.length
                      ? state.multiplePyamentList[props.methodKey].methodDetails
                          .cardTransactionNo
                      : cardDetails.cardTransactionNo
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Card Type"
                  onChange={handleCardTypeChange}
                  fullWidth
                  value={
                    state.hasOwnProperty("multiplePyamentList") &&
                    props.methodKey < state.multiplePyamentList.length
                      ? state.multiplePyamentList[props.methodKey].methodDetails
                          .cardType
                      : cardDetails.cardType
                  }
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
                  value={
                    state.hasOwnProperty("multiplePyamentList") &&
                    props.methodKey < state.multiplePyamentList.length
                      ? state.multiplePyamentList[props.methodKey].methodDetails
                          .expiryMonth
                      : cardDetails.expiryMonth
                  }
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Year"
                  onChange={handleExpiryYearChange}
                  fullWidth
                  value={
                    state.hasOwnProperty("multiplePyamentList") &&
                    props.methodKey < state.multiplePyamentList.length
                      ? state.multiplePyamentList[props.methodKey].methodDetails
                          .expiryYear
                      : cardDetails.expiryYear
                  }
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{
              textAlign: "center",
              bgcolor: "#05abeb",
              borderRadius: 1,
              margin: 1,
            }}
            variant="contained"
            onClick={saveAdvancePaymetData}
          >
            Save Card Details
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MultiplePayByCard;
