import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  status: {
    danger: "orange",
  },
  typography: {
    body1: {
      lineHeight: 1.2,
    },
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default lightTheme;
