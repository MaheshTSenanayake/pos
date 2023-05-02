import { Grid } from "@mui/material";

const data = require("../../data.json");
console.log(data.category[0].title);

function CategoryLayout() {
  return (
    <Grid container spacing={3}>
      {data.category.map((category, index) => (
        <Grid key={category._id} item xs={12}>
          <h6>{category.title}</h6>
        </Grid>
      ))}
    </Grid>
  );
}

export default CategoryLayout;
