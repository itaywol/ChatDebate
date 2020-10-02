import React from "react";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const Message = ({ classes, msgData }) => {
  const letter = msgData.sender && msgData.sender.charAt(0);
  return (
    <div
      className={`${classes.messageWrapper} ${
        msgData.sideRight && classes.messageRightSide
      } `}
    >
      <Avatar classes={{ root: classes.headerAvatar }}>{letter}</Avatar>
      <div className={classes.headerContent}>
        <Typography>{msgData.sender}</Typography>
        <Typography>{msgData.body}</Typography>
      </div>
    </div>
  );
};

export default Message;
