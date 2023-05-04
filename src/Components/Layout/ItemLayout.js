import styled from "@emotion/styled";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../action/cartAction";
import { Card, CardMedia, CardContent } from "@mui/material";
import MediaCard from "./MediaCard";
const data = require("../../data.json");

const useStyle = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ItemLayout() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setquantity] = useState("");

  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setOpen(false);
    setquantity("");
  };

  const handleChange = (event) => {
    setquantity(event.target.value);
  };

  const handleAddToCart = () => {
    const cartValue = { ...selectedItem, quantity };
    setOpen(false);
    setquantity("");
    dispatch(addItem(cartValue));
  };

  return (
    <div className={classes.root}>
      {
        <Grid container spacing={3}>
          {data.items.map((item) => (
  <Grid item xs={12} sm={6} md={4} key={item.title}>
    <MediaCard
  title={item.title}
  image={item.image}
/>

  </Grid>
))}

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
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedItem.title}
            </Typography>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <TextField
              label="Enter Quantity"
              variant="outlined"
              value={quantity}
              onChange={handleChange}
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Button variant="contained" onClick={handleAddToCart}>
                  To Cart
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      }
    </div>
  );
}

export default ItemLayout;
