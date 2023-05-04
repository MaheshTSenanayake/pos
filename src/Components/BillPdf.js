import styled from "@emotion/styled";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/base";
import { Grid } from "@mui/material";

const useStyles = styled((theme) => ({
  root: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    lineHeight: "1.5",
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  th: {
    borderBottom: "2px solid #333",
    textAlign: "left",
    padding: "10px 5px",
  },
  td: {
    borderBottom: "1px solid #333",
    textAlign: "left",
    padding: "5px",
  },
}));

function BillPdf(props) {
  const state = useSelector((state) => state);

  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString()
  );

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const invoiceData = {
    id: "INV-1234",
    date: "May 4, 2023",
    customerName: "John Doe",
    items: [
      { id: "ITEM-1", name: "Product A", quantity: 2, price: 10.0 },
      { id: "ITEM-2", name: "Product B", quantity: 1, price: 20.0 },
    ],
    total: 40.0,
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div ref={componentRef}>
        <Grid container spacing={3} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <h1>Invoice</h1>
          </Grid>
          <Grid item xs={6}>
            <p>Invoice ID: {invoiceData.id}</p>
          </Grid>
          <Grid item xs={6}>
            <p>Invoice Date: {invoiceData.date}</p>
          </Grid>
          <Grid item xs={12}>
            <p>Customer Name: {invoiceData.customerName}</p>
          </Grid>
          <Grid item xs={12}>
            <table>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" align="right">
                    Total:
                  </td>
                  <td>{invoiceData.total}</td>
                </tr>
              </tfoot>
            </table>
          </Grid>
        </Grid>
      </div>

      <div>
        <Button onClick={handlePrint}>Print </Button>
      </div>
    </div>
  );
}

export default BillPdf;
