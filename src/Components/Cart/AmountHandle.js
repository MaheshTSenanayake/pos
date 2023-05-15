import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, TextField } from "@mui/material";
import { setAmountRecieve } from "../../store/action/cartAction";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function AmountHandle() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [amountRecieved, setAmountReceived] = useState(0);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const initialAmountReceived = state.currentInvoice?.recieveAmount || 0;
    dispatch(setAmountRecieve(initialAmountReceived));
  }, [state.currentInvoice?.recieveAmount, dispatch]);

  const handleAmountReceivedValue = (e) => {
    const amountRecieved = e.target.value;
    setAmountReceived(amountRecieved);
    dispatch(setAmountRecieve(amountRecieved));
    state.currency === "LKR"
      ? setBalance(amountRecieved - state.currentInvoice.total.lkr)
      : setBalance(amountRecieved - state.currentInvoice.total.usd);
  };

  /* const clearData = () => {
    setAmountReceived("");
    setBalance(0);
    dispatch(clearCart());
    dispatch(calculateTotal());
    dispatch(createOderNumber());
  }; */

  return (
    <Box sx={{ flexGrow: 1, marginTop: "5px" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={3}>
                Total
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={
                    state.currency === "LKR"
                      ? state.currentInvoice.total.lkr
                      : state.currentInvoice.total.usd
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
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={3}>
                Amount Received
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={amountRecieved}
                  onClick={() => setAmountReceived("")}
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
          <Item>
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
      </Grid>
    </Box>
  );
}

export default AmountHandle;
