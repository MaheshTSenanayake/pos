import React from "react";
import { AppBar, Toolbar, Typography, Grid, styled } from "@mui/material";

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function MainNavigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title}>
                Hyphen
              </Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Typography variant="h6">User Name</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainNavigation;
