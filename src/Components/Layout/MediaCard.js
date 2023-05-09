import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MediaCard({ item, handleAddToCart }) {
  return (
    <Card sx={{ maxWidth: 150, margin: 1 }}>
      <CardMedia sx={{ height: 140 }} image={item.image} title={item.title} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {item.title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {item.stockQuantity} in stock
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          LKR: {item.stockQuantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
export default MediaCard;
