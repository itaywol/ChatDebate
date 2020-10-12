import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import ChatAsCard from "../components/ChatAsCard";
import { ROUTERPATHS, SIDES } from "../constants";
import { Button, TextField, FormControl } from "@material-ui/core";
import io from "socket.io-client";

const ChatAs = ({
  classes,
  history,
  location,
  match,
  staticContext,
  nickname,
  side,
  setNickname,
  setSide,
}) => {
  
  // const renewChat = (e) => {

  // }

  const moveToChatRoute = (e, side) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (nickname.length === 0) {
      return console.log("ERROR - nickname");
    }

    if (side.length === 0) {
      return console.log("ERROR - SIDE");
    }

    const url = `ws://localhost:4001/chat?room=demsvsreps&party=${side}&name=${nickname}`;
    const socket = io.connect(url);
    window.socket = socket;

    window.socket.on("connect", function () {
      console.log("connected");
    });

    history.push(ROUTERPATHS.CHAT);
    setSide(side)
  };

  return (
    <div className={classes.chatAsWrapper}>
    <form
      className={classes.chatAsContent}
    >
      <TextField
        required={true}
        label="Nickname"
        placeholder="Enter a nickname"
        variant="outlined"
        autoFocus
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <Typography classes={{ root: classes.chatAsTitle }}>
        Start Chatting as
      </Typography>

      <div className={classes.chatAsCardsWrapper}>
        <ChatAsCard
          title={"Democrate"}
          classes={classes}
          selected={side === SIDES.LEFT}
          onClick={(e) => moveToChatRoute(e, SIDES.LEFT)}
        />
        <ChatAsCard
          title={"Republican"}
          classes={classes}
          selected={side === SIDES.RIGHT}
          onClick={(e) => moveToChatRoute(e, SIDES.RIGHT)}
        />
      </div>
    </form>
    </div>
  );
};

export default ChatAs;
