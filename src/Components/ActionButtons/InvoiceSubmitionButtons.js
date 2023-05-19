import { Button, Modal } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveDraftInvoice } from "../../store/action/cartAction";
import Invoice from "../Layout/print/Invoice";
import CardPayment from "../PamentMethods/CardPayment";
import MultiplePay from "../PamentMethods/MultiplePay";

const InvoiceSubmitionBuutons = () => {
  const [pdfView, setPdfView] = useState(false);
  const [cardPay, setCardPay] = useState(false);
  const [multiplePay, setMultiplePay] = useState(false);
  const dispatch = useDispatch();

  const handlePdfClose = () => {
    setPdfView(false);
  };

  const saveCreditInvoice = () => {
    const invoiceDetails = {
      invoiceStatus: { status: "Complete", payMethod: "Credit" },
    };
    dispatch(saveDraftInvoice(invoiceDetails));
  };
  const saveInvoiceHandler = () => {
    const invoiceDetails = {
      invoiceStatus: { status: "Draft", payMethod: "Credit" },
    };
    dispatch(saveDraftInvoice(invoiceDetails));
  };
  const printBill = () => {
    const invoiceDetails = {
      invoiceStatus: { status: "Complete", payMethod: "Complete" },
    };
    dispatch(saveDraftInvoice(invoiceDetails));
    setPdfView(true);
  };
  const cardPayHandler = () => {
    setCardPay(true);
  };

  const handleCardDetailsSubmit = () => {
    // Close the modal
    setCardPay(false);
  };
  const handleMultiplePayDetailsSubmit = () => {
    setMultiplePay(false);
  };
  const multiplePayHandler = () => {
    setMultiplePay(true);
  };

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
              sx={{
                textAlign: "center",
                bgcolor: "#7ccb41",
                borderRadius: 1,
                margin: 1,
                width: { xs: 150 },
              }}
              variant="contained"
              onClick={() => printBill()}
            >
              Pay
            </Button>
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#7ccb41",
                borderRadius: 1,
                margin: 1,
                width: { xs: 150 },
              }}
              variant="contained"
              onClick={cardPayHandler}
            >
              Card
            </Button>
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#7ccb41",
                borderRadius: 1,
                margin: 1,
                width: { xs: 150 },
              }}
              variant="contained"
              onClick={multiplePayHandler}
            >
              Multiple Pay
            </Button>
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#00a4bf",
                borderRadius: 1,
                margin: 1,
                width: { xs: 150 },
              }}
              variant="contained"
              onClick={saveInvoiceHandler}
            >
              Save
            </Button>
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#9b9b9b",
                borderRadius: 1,
                margin: 1,
                width: { xs: 150 },
              }}
              variant="contained"
              onClick={() => saveCreditInvoice()}
            >
              Credit Sale
            </Button>
          </Item>
        </Grid>
      }
      {
        //Modle that open for open print view
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
      {
        //Modle that open for Enter card details
        <Modal open={cardPay}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CardPayment handleCardDetailsSubmit={handleCardDetailsSubmit} />
          </div>
        </Modal>
      }
      {
        //Modle that open for Multiple Pay methods
        <Modal open={multiplePay}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MultiplePay
              handleMultiplePayDetailsSubmit={handleMultiplePayDetailsSubmit}
            />
          </div>
        </Modal>
      }
    </div>
  );
};
export default InvoiceSubmitionBuutons;
