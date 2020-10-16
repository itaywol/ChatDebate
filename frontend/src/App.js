import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./assets/styles.js";
import ChatAs from "./containers/ChatAs";
import Chat from "./containers/Chat/Chat";
import NavBar from "./containers/Navigation/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERPATHS } from "./constants";
import About from "./containers/About";
class App extends Component {
  state = {
    nickname: "",
    side: "",
    showNavbar: true,
    activeId: "",
  };

  setNickname = (nickname) => this.setState({ nickname });
  setSide = (side) => this.setState({ side });
  hideNavBar = () => this.setState({ showNavbar: false });
  setActiveId = (activeId) => this.setState({ activeId });

  render() {
    const { classes } = this.props;
    const { nickname, side, showNavbar, activeId } = this.state;
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
        {showNavbar && <NavBar classes={classes} />}
        <div className={classes.appWrapper}>
          <Router>
            <Switch>
              <Route
                path={ROUTERPATHS.ABOUT}
                render={() => <About classes={classes} />}
              />
              <Route
                path={ROUTERPATHS.CHAT}
                render={(props) => (
                  <Chat
                    classes={classes}
                    nickname={nickname}
                    side={side}
                    hideNavBar={this.hideNavBar}
                    setSide={this.setSide}
                    activeId={activeId}
                    setActiveId={this.setActiveId}
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
                    activeId={activeId}
                    setActiveId={this.setActiveId}
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
