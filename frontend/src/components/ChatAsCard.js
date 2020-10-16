import React from "react";
import { Typography } from "@material-ui/core";
import {STRINGS} from '../constants'
const ChatAsCard = ({ classes, title, onClick  }) => (
  <div
    className={`${classes.chatAsCard} ${title === STRINGS.LEFT_HEADER ? classes.chatAsLeft : classes.chatAsRight} `}
    onClick={onClick}
  >
    <Typography>{title}</Typography>
  </div>
);

export default ChatAsCard;
