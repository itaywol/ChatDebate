import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./assets/styles.js";
import ChatAs from "./containers/ChatAs";
import Chat from "./containers/Chat/Chat";
import NavBar from "./containers/Navigation/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERPATHS } from "./constants";
import io from "socket.io-client";

class App extends Component {
  componentDidMount() {
    const socket = io.connect(
      "ws://localhost:4001/chat?room=demsvsreps&party=dems&name=Eden"
    );
    window.socket = socket;

    window.socket.on("connect", function () {
      console.log("connected");
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <NavBar classes={classes} /> */}

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
      </div>
    );
  }
}

export default withStyles(styles)(App);
