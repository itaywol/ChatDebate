import { debounce } from "@material-ui/core";
import React, { Component } from "react";
import Message from "./Message";
import scrollIntoView from "scroll-into-view-if-needed";
import { socket } from "../../socketUtils";
class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldScrollBottom: true,
    };

    this.messageBoxBottom = React.createRef();

    // getting msg object
    socket.on("message", (data) => {
      const {activeId} = this.props;

      if (data.senderId !== activeId) {
        console.log("ENTERED MESSAGE ON")
        const { messages, setMessages } = this.props;
        let updatedMessages = [...messages];
        updatedMessages.push(data);

        setMessages(updatedMessages);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldScrollBottom } = this.state;
    const {messages} = this.props
    if (messages.length !== prevProps.messages.length && shouldScrollBottom) {
      this.scrollToBottom();
    }
  }

  handleScroll = (e) => {
    const { shouldScrollBottom } = this.state;
    const { target } = e;

    if (!target) return;
    const offset = 60;

    if (
      target.scrollHeight - target.scrollTop >= target.clientHeight + offset &&
      shouldScrollBottom
    ) {
      console.log("NOT");
      this.setState({ shouldScrollBottom: false });
    }

    if (
      target.scrollHeight - target.scrollTop < target.clientHeight + offset &&
      !shouldScrollBottom
    ) {
      console.log("scroll to the bottom of the div");
      this.setState({ shouldScrollBottom: true });
    }
  };

  scrollToBottom = () => {
    scrollIntoView(this.messageBoxBottom.current, { behavior: "smooth" });
  };

  render() {
    const { classes, messages } = this.props;
    

    return (
      <div className={classes.messageBoxWrapper} onScroll={this.handleScroll}>
        <div style={{ position: "relative", paddingTop: 10 }}>
          {messages.map((msg) => (
            <Message
              key={msg.senderId + msg.sender + msg.body}
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
