import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./assets/styles.js";
import ChatAs from "./containers/ChatAs";
import Chat from "./containers/Chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERPATHS } from "./constants";
class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.appWrapper}>
        <Router>
          <Switch>
            <Route
              path={ROUTERPATHS.CHAT}
              render={(props) => <Chat classes={classes} {...props} />}
            />
            <Route
              path={ROUTERPATHS.ROOT}
              render={(props) => <ChatAs classes={classes} {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
