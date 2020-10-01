import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./assets/styles.js";
class App extends Component {
  render() {
    const { classes } = this.props;
    console.log("classes", classes);

    return (
      <div className={classes.myCustomClass}>
        test jss styles and lighttheme
      </div>
    );
  }
}

export default withStyles(styles)(App);
