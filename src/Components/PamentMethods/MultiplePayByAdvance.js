import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const MultiplePayByAdvance = (props) => {
  const state = useSelector((state) => state.currentInvoice);
  const [paymentNote, setPaymentNote] = useState({});
  const saveAdvancePaymetData = () => {
    props.sendAdvanceData(paymentNote);
  };
  const handlePaymentNote = (e) => {
    setPaymentNote({
      ...paymentNote,
      methodDetails: { paymentNote: e.target.value },
      methodListKey: props.methodKey,
    });
  };

  return (
    <Grid container>
      <Grid item xs={10} sx={{ alignContent: "center" }}>
        <TextField
          multiline
          value={
            state.hasOwnProperty("multiplePyamentList") &&
            props.methodKey < state.multiplePyamentList.length
              ? state.multiplePyamentList[props.methodKey].methodDetails
                  .paymentNote
              : paymentNote.paymentNote
          }
          onChange={handlePaymentNote}
          rows={4}
          variant="outlined"
          label="Payment Note"
          fullWidth
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
          Save Advance Details
        </Button>
      </Grid>
    </Grid>
  );
};
export default MultiplePayByAdvance;
