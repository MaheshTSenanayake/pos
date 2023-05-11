import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";

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
  const state = useSelector((state) => state);
  const classes = useStyle();
  const checkInvocelist = () => {
    console.log(state.currentInvoice);
  };
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button
            sx={{
              bgcolor: "#10BADF",
              margin: 1,
              borderRadius: 1,
              width: { xs: 180, sm: 100, md: 150 },
            }}
            variant="contained"
            onClick={() => {
              checkInvocelist();
            }}
          >
            All
          </Button>
        </Grid>
        {state.category.map((category, index) => (
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
