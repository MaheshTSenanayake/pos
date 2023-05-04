import styled from "@emotion/styled";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [value, setValue] = useState("");

  const handleItemClick = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    <div className={classes.root}>
      {
        <Grid container spacing={3}>
          {data.items.map((item) => (
            <Grid item xs={12} sm={6} md={2} key={item.title}>
              <div
                className={classes.paper}
                style={{ backgroundColor: "#f6fafb" }}
                onClick={() => handleItemClick(item)}
              >
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
              </div>
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
           
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Button variant="contained" onClick={handleClose}>
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
