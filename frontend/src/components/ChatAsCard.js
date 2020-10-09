import React from "react";
import { Typography } from "@material-ui/core";

const ChatAsCard = ({ classes, title, onClick, selected }) => (
  <div
    className={`${classes.chatAsCard} ${classes.chatAsLeft} ${
      selected && classes.chatAsSelected
    }`}
    onClick={onClick}
  >
    <Typography>{title}</Typography>
  </div>
);

export default ChatAsCard;
