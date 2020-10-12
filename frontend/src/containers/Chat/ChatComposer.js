import React, { Component } from "react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

class ChatComposer extends Component {
  state = {
    messageBody: "",
  };

  // aaaaa = > ""
  
  handleInputChange = (e) => {
    const updatedMessageBody = e.target.value;
    if(this.state.messageBody !== updatedMessageBody && updatedMessageBody === "") {
      // window.socket && window.socket.emit("typingDone");
      // should be called from backend - whenever calling typing - after 4 seconds of timeout - invoke typingDone automatically from there
    } else {
      window.socket && window.socket.emit("typing");
    }
    this.setState({ messageBody: e.target.value });
  };

  sendMessage = (e) => {
    e.preventDefault();
    const { messageBody } = this.state;
    window.socket.emit("message", messageBody);
    this.setState({ messageBody: "" });
  };

  handleKeypress = (e) => {
    if (e.which === 13) {
      this.sendMessage(e);
    }
  };

  render() {
    const { classes } = this.props;
    const { messageBody } = this.state;
    return (
      <div className={classes.ChatComposerWrapper}>
        <div className={classes.chatComposerContent}>
          <input
            style={{
              padding: 0,
              background: "none",
              border: "unset",
              width: "100%",
              borderRadius: 30,
              outline: "none",
              paddingLeft: 20,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              resize: "none",
              overflow: "auto",
            }}
            autoFocus={true}
            type="text"
            placeholder={"Type a message..."}
            value={messageBody}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeypress}
          />
        </div>
        <div className={classes.chatComposerIcons}>
          <IconButton
            disabled={this.state.messageBody.length < 1 && true}
            onClick={this.sendMessage}
            className={classes.chatComposerSend}
          >
            <SendIcon />
          </IconButton>
          <IconButton>
            <SentimentVerySatisfiedIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

{
  /* <textarea
            style={{
              width: "100%",
              borderRadius: 30,
              outline: "none",
              paddingLeft: 20,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              resize: "none",
              overflow: "auto",
            }}
            autoFocus={true}
            type="text"
            placeholder={"Type a message..."}
            value={messageBody}
            onChange={this.handleInputChange}
          /> */
}

export default ChatComposer;
