import React, { Component } from "react";
import Header from "./ChatHeader";
import MessageBox from "./MessageBox";
import ChatComposer from "./ChatComposer";

class Chat extends Component {
  componentDidMount(){ 
    this.props.hideNavBar();
  }

  render() {
    const { classes, nickname, side } = this.props;

    return (
      <div className={classes.chatWrapper}>
        <Header classes={classes} nickname={nickname} side={side} />
        <MessageBox classes={classes} nickname={nickname} side={side} />
        <ChatComposer classes={classes} nickname={nickname} side={side} />
      </div>
    );
  }
}

export default Chat;
