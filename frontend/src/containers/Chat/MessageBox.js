import { debounce } from "@material-ui/core";
import React, { Component } from "react";
import Message from "./Message";
import scrollIntoView from 'scroll-into-view-if-needed'
class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoData: [],
      shouldScrollBottom: true,
    };

    this.messageBoxBottom = React.createRef();

    window.socket &&
      window.socket.on("message", (data) => {
        const { demoData } = this.state;
        let updatedMessages = [...demoData];
        updatedMessages.push(data);
        this.setState({ demoData: updatedMessages });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { demoData, shouldScrollBottom } = this.state;
    if (demoData.length !== prevState.demoData.length && shouldScrollBottom) {
      this.scrollToBottom();
    }
  }

  handleScroll = (e) => {
    const { shouldScrollBottom } = this.state;
    const { target } = e;
    
    if(!target) return;
    const offset = 60;

    if((target.scrollHeight - target.scrollTop >= target.clientHeight + offset) && shouldScrollBottom ) {
      console.log("NOT")
      this.setState({shouldScrollBottom: false})
    }

    if((target.scrollHeight - target.scrollTop < target.clientHeight + offset) && !shouldScrollBottom ) { 
      console.log("scroll to the bottom of the div")
      this.setState({shouldScrollBottom: true})
    };
  };

  scrollToBottom = () => {
    // this.messageBoxBottom.current.scrollIntoView();
    scrollIntoView(this.messageBoxBottom.current, {behavior: 'smooth'})
  };

  render() {
    const { classes } = this.props;
    const { demoData } = this.state;

    return (
      <div className={classes.messageBoxWrapper} onScroll={this.handleScroll}>
        <div style={{ position: "relative", paddingTop: 10 }}>
          {demoData.map((msg) => (
            <Message
              key={Math.random() + msg.sender + msg.body}
              classes={classes}
              msgData={msg}
            />
          ))}
          <div ref={this.messageBoxBottom} />
        </div>
      </div>
    );
  }
}

export default MessageBox;
