import styled from "@emotion/styled";
import { Grid } from "@mui/material";

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
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.items.map((item) => (
          <Grid item xs={12} sm={6} md={2} key={item.title}>
            <div className={classes.paper} style={{ backgroundColor: '#f6fafb' }}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ItemLayout;
