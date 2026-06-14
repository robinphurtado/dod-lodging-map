// import React from "react";
// import ReactDOM from "react-dom";

// import App from './App';

// ReactDOM.render(
//     <App />, document.getElementById('root')
// );

//v2v
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
//v2 ^