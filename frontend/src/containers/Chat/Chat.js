import React, { Component } from "react";
import Header from "./ChatHeader";
import MessageBox from "./MessageBox";
import ChatComposer from "./ChatComposer";
import Loader from '../../components/Loader';
class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      typingString: "",
      loading: false
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
    const { classes, nickname, side, history, setSide } = this.props;
    const { typingString, loading } = this.state;

    if(loading) {
      return <Loader label={'Loading Page'}/>
    }

    return (
      <div className={classes.chatWrapper}>
        <Header classes={classes} nickname={nickname} side={side} typingString={typingString} history={history} setSide={setSide} />
        <MessageBox classes={classes} nickname={nickname} side={side} />
        <ChatComposer classes={classes} nickname={nickname} side={side} typingString={typingString} />
      </div>
    );
  }
}

export default Chat;
