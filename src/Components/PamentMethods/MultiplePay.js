import {
  Grid,
  IconButton,
  TextField,
  MenuItem,
  Button,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const MultiplePay = (props) => {
  const [cardNumber, setCardNumber] = useState("");
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };
  const { handleMultiplePayDetailsSubmit } = props;
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
              onClick={handleMultiplePayDetailsSubmit}
            >
              <CloseIcon />
            </IconButton>
            <Grid item xs={12}>
              <h1>Multiple Payment</h1>
            </Grid>
            <Grid item xs={12}>
              <p>Advance Balance:</p>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Amount"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Payment Method"
                  /* value={cardHolderName} */ /* onChange={handleCardHolderNameChange}  */ fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card holder name"
                  /* value={cardHolderName} */ /* onChange={handleCardHolderNameChange}  */ fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Card Transaction No."
                  /* value={cardTransactionNo} onChange={handleCardTransactionNoChange} */ fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Card Type"
                  /* value={cardType} onChange={handleCardTypeChange} */ fullWidth
                >
                  <MenuItem value="Visa">Visa</MenuItem>
                  <MenuItem value="Mastercard">Mastercard</MenuItem>
                  <MenuItem value="American Express">American Express</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Month"
                  /* value={expiryMonth} onChange={handleExpiryMonthChange}  */ fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Year"
                  /* value={expiryYear} onChange={handleExpiryYearChange} */ fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  <label htmlFor="payment_note">payment_note</label>
                  <TextareaAutosize
                    className="form-control"
                    placeholder="Remarks"
                    id="payment_note"
                    name="payment[0][remarks]"
                    rows={3}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
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
export default MultiplePay;
