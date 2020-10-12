import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./assets/styles.js";
import ChatAs from "./containers/ChatAs";
import Chat from "./containers/Chat/Chat";
import NavBar from "./containers/Navigation/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERPATHS } from "./constants";

class App extends Component {
  state = {
    nickname: "",
    side: "",
    showNavbar: true
  };

  setNickname = (nickname) => this.setState({ nickname });
  setSide = (side) => this.setState({ side });
  hideNavBar = () => this.setState({showNavbar: false})

  render() {
    const { classes } = this.props;
    const { nickname, side, showNavbar } = this.state;
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
        { showNavbar && <NavBar classes={classes} />}
        <div className={classes.appWrapper}>
          <Router>
            <Switch>
              <Route
                path={ROUTERPATHS.CHAT}
                render={(props) => (
                  <Chat
                    classes={classes}
                    nickname={nickname}
                    side={side}
                    hideNavBar={this.hideNavBar}
                    setSide={this.setSide}
                    {...props}
                  />
                )}
              />
              <Route
                path={ROUTERPATHS.ROOT}
                render={(props) => (
                  <ChatAs
                    classes={classes}
                    nickname={nickname}
                    side={side}
                    setNickname={this.setNickname}
                    setSide={this.setSide}
                    {...props}
                  />
                )}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
