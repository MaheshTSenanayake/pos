import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import BillPDF from "../BillPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

function CartLayout() {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [amountReceived, setAmountReceived] = useState("");
  const [balance, setBalance] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [pdfView, setPdfView] = useState(false);

  const handlePayment = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setAmountReceived(event.target.value);
  };
  const calculateBalance = () => {
    setBalance(amountReceived - state.total);
    setShowBalance(true);
  };
  const billPdf = () => {
    setOpen(false);
    setPdfView(true);
  };
  const handlePdfClose = () => {
    setPdfView(false);
  };

  return (
    <div>
      {
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              sx={{ padding: 2 }}
              bgcolor="#e9e9e9"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="p">Order:</Typography>
              </Grid>
              <Grid item xs>
                <TextField
                  size="small"
                  sx={{ width: "100px" }}
                  variant="outlined"
                  margin="normal"
                  value={state.orderNumber}
                />
              </Grid>
              <Grid item container justifyContent="flex-end" xs={6}>
                <Button
                  sx={{
                    textAlign: "center",
                    bgcolor: "#f35151",
                    borderRadius: 1,
                    width: { xs: 180, sm: 100, md: 150 },
                  }}
                  variant="contained"
                  startIcon={<ClearIcon />}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ padding: "10px", height: "500px", overflow: "auto" }}
          >
            <Grid container sx={{ padding: 2 }} bgcolor="#e9e9e9">
              <Grid item xs={6}>
                <Typography variant="body1">Item</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body1">Quantity</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Price</Typography>
                </Grid>
              </Grid>
            </Grid>

            {state.items.map((items, index) => (
              <Grid
                key={items._id}
                item
                xs={12}
                bgcolor="#dbffff"
                sx={{ height: "50px" }}
                container
                alignItems="center"
                paddingLeft="10px"
                paddingRight="10px"
              >
                <Grid item xs={6}>
                  <Typography variant="body1">{items.title}</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography variant="body1">Qty {items.quantity}</Typography>
                  <TextField
                    size="small"
                    sx={{ width: "80px", marginLeft: 2 }}
                    variant="outlined"
                    margin="normal"
                    value={"Rs: " + items.price * items.quantity}
                  />
                  <CancelIcon sx={{ marginLeft: 2, color: "#f35151" }} />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <h4>Discount</h4>
          </Grid>
          <Grid item xs={12}>
            <h4>{state.total}</h4>
          </Grid>
          <Grid item xs={12}>
            <h4>Sub Total</h4>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              sx={{
                bgcolor: "#10BADF",
                marginTop: 1,
                borderRadius: 1,
                width: { xs: 180, sm: 100, md: 150 },
              }}
              variant="contained"
              onClick={() => handlePayment()}
            >
              Pay
            </Button>
          </Grid>
        </Grid>
      }
      {
        <Modal open={open} onClose={handleClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              width: "500px",
              height: "400px",
              padding: "20px",
              borderRadius: "5px",
              outline: "none",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CancelIcon
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#f35151",
              }}
            />
            <Typography variant="h4">Bill Summary</Typography>
            <TextField
              label="Total"
              variant="outlined"
              value={state.total}
              margin="normal"
            />
            <TextField
              label="Received Amount"
              variant="outlined"
              value={amountReceived}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={calculateBalance}
              sx={{ margin: "10px" }}
            >
              Balance
            </Button>
            {showBalance && (
              <TextField
                label="Balance"
                variant="outlined"
                value={balance}
                margin="normal"
              />
            )}
            {showBalance && (
              <Button variant="contained" onClick={billPdf}>
                Print
              </Button>
            )}
          </div>
        </Modal>
      }
      {
        <Modal open={pdfView} onClose={handlePdfClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              width: "1000px",
              height: "1500px",
              padding: "20px",
              borderRadius: "5px",
              outline: "none",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BillPDF amount={amountReceived}/>
            {/* <PDFDownloadLink
              document={<BillPDF amount={amountReceived} />}
              fileName="example.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button
                    variant="contained"
                    onClick={calculateBalance}
                    sx={{ margin: "10px" }}
                  >
                    Loading Document...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={calculateBalance}
                    sx={{ margin: "10px" }}
                  >
                    Download
                  </Button>
                )
              }
            </PDFDownloadLink> */}
          </div>
        </Modal>
      }
    </div>
  );
}

export default CartLayout;
