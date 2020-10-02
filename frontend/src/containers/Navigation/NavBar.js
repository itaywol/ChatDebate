import React, { Component } from "react";
import NavItem from "./NavItem";
import ChatIcon from "@material-ui/icons/Chat";
import IconButton from "@material-ui/core/IconButton";
class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.navBarWrapper}>
        <IconButton>
          <ChatIcon />
        </IconButton>

        <NavItem title={"Home"} classes={classes} />
        <NavItem title={"About"} classes={classes} />
      </div>
    );
  }
}

export default NavBar;
