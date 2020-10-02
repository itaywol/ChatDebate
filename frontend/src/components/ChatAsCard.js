import React from "react";
import { Typography } from "@material-ui/core";

const ChatAsCard = ({ classes, title, onClick }) => (
  <div className={classes.chatAsCard} onClick={onClick}>
    <Typography>{title}</Typography>
  </div>
);

export default ChatAsCard;
