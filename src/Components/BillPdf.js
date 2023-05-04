import styled from "@emotion/styled";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/base";
import { Grid } from "@mui/material";

const Container = styled(Grid)({
  fontFamily: "Arial, sans-serif",
  fontSize: 14,
  lineHeight: "1.5",
  color: "#333",
});

const Title = styled.h1({
  fontSize: 24,
  fontWeight: "bold",
  margin: "0 0 10px 0",
});

const SubTitle = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const SubTitleItem = styled.div({
  flexBasis: "50%",
});

const Table = styled.table({
  borderCollapse: "collapse",
  width: "100%",
});

const TableHeader = styled.th({
  borderBottom: "2px solid #333",
  textAlign: "left",
  padding: "10px 5px",
});

const TableData = styled.td({
  borderBottom: "1px solid #333",
  textAlign: "left",
  padding: "5px",
});

const TotalRow = styled.tr({
  borderTop: "2px solid #333",
  textAlign: "right",
});

const TotalLabel = styled.td({
  fontWeight: "bold",
  paddingTop: 10,
  paddingRight: 5,
  textAlign: "right",
});

const TotalValue = styled.td({
  fontWeight: "bold",
  paddingTop: 10,
  paddingLeft: 5,
  textAlign: "right",
});

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

  return (
    <div>
    
    <div ref={componentRef}>
    <Container container spacing={3}>
      <Grid item xs={12}>
        <Title>Invoice</Title>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubTitle>
          <SubTitleItem>
            <strong>Invoice ID:</strong> {invoiceData.id}
          </SubTitleItem>
          <SubTitleItem>
            <strong>Invoice Date:</strong> {invoiceData.date}
          </SubTitleItem>
        </SubTitle>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubTitle>
          <SubTitleItem>
            <strong>Customer Name:</strong> {invoiceData.customerName}
          </SubTitleItem>
        </SubTitle>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <thead>
            <tr>
              <TableHeader>Item ID</TableHeader>
              <TableHeader>Item Name</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Total</TableHeader>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData>{item.name}</TableData>
                <TableData>{item.quantity}</TableData>
                <TableData>{item.price}</TableData>
                <TableData>{item.quantity * item.price}</TableData>
              </tr>
            ))}
            <TotalRow>
              <TotalLabel colSpan="4">Total</TotalLabel>
              <TotalValue>{invoiceData.total}</TotalValue>
            </TotalRow>
          </tbody>
        </Table>
      </Grid>
    </Container>
    </div>
    <Grid item xs={12}>
        <Button onClick={handlePrint}>Print</Button>
      </Grid>
    </div>
  );
}

export default BillPdf;