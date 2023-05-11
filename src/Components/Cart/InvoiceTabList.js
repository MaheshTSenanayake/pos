import React, { useState } from "react";
import { Grid, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoiceData } from "../../store/action/cartAction";

const InvoiceTabList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.invoiceList);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearchInvoice = (e) => {
    if (e.keyCode === 13) {
      const selectedInvoice = state.find(
        (item) => item.invoiceId === parseInt(e.target.value)
      );
      dispatch(loadInvoiceData(selectedInvoice));
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12} md={8}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="invoice tabs"
        >
          {state.map((item) => (
            <Tab key={item.invoiceId} label={item.invoiceId} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          onKeyDown={handleSearchInvoice}
          size="small"
          placeholder="Enter Invoice ID"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default InvoiceTabList;
