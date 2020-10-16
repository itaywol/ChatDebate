import React, { Component } from "react";
import NavItem from "./NavItem";
import ChatIcon from "@material-ui/icons/Chat";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {withRouter} from 'react-router'
import { ROUTERPATHS } from "../../constants";

class NavBar extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      // <div className={classes.navBarWrapper}>
      //   <IconButton>
      //     <ChatIcon />
      //   </IconButton>

      //   <NavItem title={"Home"} classes={classes} />
      //   <NavItem title={"About"} classes={classes} />
      // </div>
      <AppBar position="fixed" classes={{root: classes.navBarToolbar}}>
        <Toolbar >
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Chat Debate
          </Typography>

          <nav style={{ marginLeft: "auto" }}>
            <Button color="inherit" onClick={() => history.push(ROUTERPATHS.ROOT)}>Home</Button>
            <Button color="inherit" >Rooms</Button>
            <Button color="inherit" onClick={() => history.push(ROUTERPATHS.ABOUT)}>About</Button>
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(NavBar);