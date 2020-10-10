import React, { Component } from "react";
import Header from "./ChatHeader";
import MessageBox from "./MessageBox";
import ChatComposer from "./ChatComposer";

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      typingString: ""
    }

    window.socket && window.socket.on("typing", ({ sender, body }) => {
      const { nickname } = this.props;
      if(this.state.typingString === "" && nickname !== sender) {
        this.setState({ typingString: `${body}...`});
      }
    });
    // setTimeout of 5 seconds when message composer is clear emit.typingDone
  }
  
  componentDidMount(){ 
    this.props.hideNavBar();
  }

  render() {
    const { classes, nickname, side } = this.props;
    const { typingString } = this.state;
    return (
      <div className={classes.chatWrapper}>
        <Header classes={classes} nickname={nickname} side={side} typingString={typingString} />
        <MessageBox classes={classes} nickname={nickname} side={side} />
        <ChatComposer classes={classes} nickname={nickname} side={side} typingString={typingString} />
      </div>
    );
  }
}

export default Chat;
