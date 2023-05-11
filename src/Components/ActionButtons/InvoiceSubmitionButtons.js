import { Button, Modal } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Invoice from "../Layout/print/Invoice";
/* import moment from "moment"; */

const InvoiceSubmitionBuutons = () => {
  /* const now = moment();
  const date = now.format("YYYY/MM/DD");
  const time = now.format("hh:mm:ss A"); */

  const [pdfView, setPdfView] = useState(false);

  const printBill = (invoiceData) => {
    /* invoiceData.invoiceStatus = { status: "Complete", payMethod: "Complete" }; 
    dispatch(saveDraftInvoice(invoiceData));*/
    setPdfView(true);
  };

  const handlePdfClose = () => {
    setPdfView(false);
  };

  /* const saveInvoiceData = (invoiceData) => {
    invoiceData.invoiceStatus = { status: "Drafts", payMethod: "notDefine" };
    dispatch(saveDraftInvoice(invoiceData));
    dispatch(createOderNumber());
  };
  const saveCreditInvoice = (invoiceData) => {
    invoiceData.invoiceStatus = { status: "Complete", payMethod: "Credit" };
    dispatch(saveDraftInvoice(invoiceData));
    dispatch(createOderNumber());
  }; */

  /*  

  const invoiceData = {
    invoiceId: state.orderNumber,
    date: date,
    time: time,
    customerId: 1,
    currency: state.currency,
    purchaseItems: state.currentInvoice.cartItems,
    total: state.currency === "LKR" ? state.total.lkr : state.total.usd,
    amountRecieved: amountRecieved,
    balance: balance,
  }; */

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      {
        <Grid item xs={12}>
          <Item sx={{ textAlign: "center" }}>
            <Button
              size="small"
              sx={{
                textAlign: "center",
                bgcolor: "#7ccb41",
                borderRadius: 1,
                margin: 1,
                width: { xs: 110 },
              }}
              variant="contained"
              onClick={() => printBill()}
            >
              Pay
            </Button>
            <Button
              size="small"
              sx={{
                textAlign: "center",
                bgcolor: "#00a4bf",
                borderRadius: 1,
                margin: 1,
                width: { xs: 110 },
              }}
              variant="contained"
              /* onClick={() => saveInvoiceData(invoiceData)} */
            >
              Save
            </Button>
            <Button
              size="small"
              sx={{
                textAlign: "center",
                bgcolor: "#9b9b9b",
                borderRadius: 1,
                margin: 1,
                width: { xs: 110 },
              }}
              variant="contained"
              /* onClick={() => saveCreditInvoice(invoiceData)} */
            >
              Credit Sale
            </Button>
            <Button
              size="small"
              sx={{
                textAlign: "center",
                bgcolor: "#9b9b9b",
                borderRadius: 1,
                margin: 1,
                width: { xs: 110 },
              }}
              variant="contained"
              /* onClick={() => saveCreditInvoice(invoiceData)} */
            >
              New
            </Button>
          </Item>
        </Grid>
      }
      {
        <Modal open={pdfView} onClose={handlePdfClose}>
          <div
            style={{
              width: "1000px",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Invoice />
          </div>
        </Modal>
      }
    </div>
  );
};
export default InvoiceSubmitionBuutons;
