import React from "react";
import { Typography } from "@material-ui/core";
import ChatAsCard from "../components/ChatAsCard";
import { ROUTERPATHS } from "../constants";

const ChatAs = ({ classes, history, location, match, staticContext }) => {
  const moveToChatRoute = () => {
    history.push(ROUTERPATHS.CHAT);
  };

  return (
    <div className={classes.chatAsWrapper}>
      <Typography classes={{ root: classes.chatAsTitle }}>
        Start Chatting as
      </Typography>
      <div className={classes.chatAsCardsWrapper}>
        <ChatAsCard
          title={"Democrate"}
          classes={classes}
          onClick={moveToChatRoute}
        />
        <ChatAsCard
          title={"Republican"}
          classes={classes}
          onClick={moveToChatRoute}
        />
      </div>
    </div>
  );
};

export default ChatAs;
