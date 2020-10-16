import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import ChatAsCard from "../components/ChatAsCard";
import { ROUTERPATHS, SIDES, STRINGS } from "../constants";
import { Button, TextField, FormControl } from "@material-ui/core";
import { socket, initSocket } from "../socketUtils";
import SVG from "../assets/icons";

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
  setActiveId,
  activeId,
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

    initSocket({ nickname, side });

    socket.on("connect", () => {
      console.log("connect - data", socket);
      setActiveId(socket.id);
    });

    history.push(ROUTERPATHS.CHAT);
    setSide(side);
  };

  return (
    <div className={classes.chatAsWrapper}>
      <form className={classes.chatAsContent}>
        <SVG type={"UnitedStates"} styles={{ width: 150 }} />

        <TextField
          required={true}
          label="Nickname"
          size={"small"}
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
            classes={classes}
            title={STRINGS.LEFT_HEADER}
            onClick={(e) => moveToChatRoute(e, SIDES.LEFT)}
          />
          <ChatAsCard
            classes={classes}
            title={STRINGS.RIGHT_HEADER}
            onClick={(e) => moveToChatRoute(e, SIDES.RIGHT)}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatAs;
