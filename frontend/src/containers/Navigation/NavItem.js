import React from "react";
import { Typography } from "@material-ui/core";
const NavItem = ({ classes, title }) => {
  return <Typography className={classes.navItem}>{title}</Typography>;
};

export default NavItem;
