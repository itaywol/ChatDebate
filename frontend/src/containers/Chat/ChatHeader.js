import React from "react";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const ChatHeader = ({ classes, nickname, side }) => {
  return (
    <div className={classes.headerWrapper}>
      <Avatar classes={{ root: classes.headerAvatar }}>T</Avatar>
      <div className={classes.headerContent}>
        <Typography style={{}}>Tom</Typography>
        <Typography style={{ color: "grey" }}>Democrate</Typography>
      </div>
    </div>
  );
};

export default ChatHeader;
