import React from "react";

import {
  AppBar,
  Container,
  makeStyles,
  Typography,
  Toolbar,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="" position="static" style={{backgroundColor: '#092a66'}}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}>
              Crypto Tracker
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
