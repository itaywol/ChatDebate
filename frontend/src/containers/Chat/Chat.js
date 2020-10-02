import React, { Component } from "react";
import Header from "./ChatHeader";
import MessageBox from "./MessageBox";
import ChatComposer from "./ChatComposer";
class Chat extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.chatWrapper}>
        <Header classes={classes} />
        <MessageBox classes={classes} />
        <ChatComposer classes={classes} />
      </div>
    );
  }
}

export default Chat;
