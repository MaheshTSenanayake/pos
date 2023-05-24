import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const MultiplePayByBankTransfer = (props) => {
  const [bankTransferData, setBankTransferData] = useState({});
  const state = useSelector((state) => state.currentInvoice);
  const saveAdvancePaymetData = () => {
    props.sendAdvanceData(bankTransferData);
  };
  const bankAccountNumberHandler = (e) => {
    setBankTransferData({
      ...bankTransferData,
      methodDetails: { accountNumber: e.target.value },
      methodListKey: props.methodKey,
    });
  };
  const paymentNoteHandler = (e) => {
    setBankTransferData({
      ...bankTransferData,
      methodDetails: {
        ...bankTransferData.methodDetails,
        paymentNote: e.target.value,
      },
    });
  };

  return (
    <Grid container>
      <Grid item xs={10} marginTop="10px">
        <TextField
          onChange={bankAccountNumberHandler}
          variant="outlined"
          label="Bank Account Number"
          fullWidth
          value={
            state.hasOwnProperty("multiplePyamentList") &&
            props.methodKey < state.multiplePyamentList.length
              ? state.multiplePyamentList[props.methodKey].methodDetails
                  .accountNumber
              : bankTransferData.accountNumber
          }
        />
      </Grid>
      <Grid item xs={10} marginTop="10px">
        <TextField
          onChange={paymentNoteHandler}
          multiline
          rows={4}
          variant="outlined"
          label="Payment Note"
          fullWidth
          value={
            state.hasOwnProperty("multiplePyamentList") &&
            props.methodKey < state.multiplePyamentList.length
              ? state.multiplePyamentList[props.methodKey].methodDetails
                  .paymentNote
              : bankTransferData.paymentNote
          }
        />
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
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
export default MultiplePayByBankTransfer;
