import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const MultiplePayByCheque = (props) => {
  const [chequeInformation, setChequeInformation] = useState({});
  const state = useSelector((state) => state.currentInvoice);
  const handleChequeNumberChange = (e) => {
    const number = e.target.value;
    setChequeInformation({ ...chequeInformation, chequeNumber: number });
  };
  const handlePaymentNote = (e) => {
    const paymentNote = e.target.value;
    setChequeInformation({ ...chequeInformation, paymentNote: paymentNote });
  };
  const saveChequePaymetData = () => {
    const sendingChequeData = {
      ...chequeInformation,
      methodDetails: chequeInformation,
      methodListKey: props.methodKey,
    };
    props.sendAdvanceData(sendingChequeData);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} marginTop="10px">
        <TextField
          variant="outlined"
          label="Cheque Number"
          onChange={handleChequeNumberChange}
          fullWidth
          value={
            state.hasOwnProperty("multiplePyamentList") &&
            props.methodKey < state.multiplePyamentList.length
              ? state.multiplePyamentList[props.methodKey].methodDetails
                  .chequeNumber
              : chequeInformation.chequeNumber
          }
        />
      </Grid>
      <Grid item xs={10} marginTop="10px">
        <TextField
          multiline
          rows={4}
          onChange={handlePaymentNote}
          variant="outlined"
          label="Payment Note"
          fullWidth
          value={
            state.hasOwnProperty("multiplePyamentList") &&
            props.methodKey < state.multiplePyamentList.length
              ? state.multiplePyamentList[props.methodKey].methodDetails
                  .paymentNote
              : chequeInformation.paymentNote
          }
        />
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
          onClick={saveChequePaymetData}
        >
          Save Cheque Information
        </Button>
      </Grid>
    </Grid>
  );
};
export default MultiplePayByCheque;
