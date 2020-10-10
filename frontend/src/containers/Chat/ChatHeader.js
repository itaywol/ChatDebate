import React from "react";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {STRINGS} from '../../../src/constants';
const ChatHeader = ({ classes, nickname, side, typingString}) => {
  
  const opponentSide = side === STRINGS.LEFT_HEADER ? STRINGS.RIGHT_HEADER : STRINGS.LEFT_HEADER;

  return (
    <div className={classes.headerWrapper}>
      <Avatar classes={{ root: classes.headerAvatar }}>T</Avatar>
      <div className={classes.headerContent}>
        <Typography>Tom</Typography>
        <Typography style={{ color: "grey" }}>{typingString ? typingString : opponentSide}</Typography>
      </div>
    </div>
  );
};

export default ChatHeader;
