import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { setAmountRecieve } from "../../store/action/cartAction";
import { useEffect } from "react";

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

  useEffect(() => {
    const initialAmountReceived = state.currentInvoice?.recieveAmount || 0;
    dispatch(setAmountRecieve(initialAmountReceived));
  }, [state.currentInvoice?.recieveAmount, dispatch]);

  return (
    <Box sx={{ flexGrow: 1, marginTop: "5px", marginBottom: "5px" }}>
      <Grid item xs={12}>
        <Item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h5">Total</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
              fullWidth
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
      </Grid>
    </Box>
  );
}

export default AmountHandle;
