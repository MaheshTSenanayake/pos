import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";

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

function CategoryLayout() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center">
        {data.category.map((category, index) => (
          <Grid key={category._id} item xs={12}>
            <Button
              sx={{
                bgcolor: "#10BADF",
                margin: 1,
                borderRadius: 1,
                width: { xs: 180, sm: 100, md: 150 },
              }}
              variant="contained"
            >
              {category.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CategoryLayout;
