import React, { Component } from "react";
import Message from "./Message";

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoData: [
        { id: 0, sender: "Tom", body: "Hello there !", sideRight: true },
        { id: 1, sender: "Eden", body: "Hey how are you ?" },
        { id: 0, sender: "Tom", body: "I'm great?", sideRight: true },
        { id: 1, sender: "Eden", body: "I'M GLAD YOU PIECE OF SHIT?" },
      ],
    };
    window.socket &&
      window.socket.on("message", (data) => {
        const { demoData } = this.state;
        let updatedMessages = [...demoData];
        updatedMessages.push(data);

        this.setState({ demoData: updatedMessages });
      });
  }

  render() {
    const { classes } = this.props;
    const { demoData } = this.state;

    return (
      <div className={classes.messageBoxWrapper}>
        <div className={classes.messageBoxBackgroundImage} />
        <div style={{ position: "relative", paddingTop: 10 }}>
          {demoData.map((msg) => (
            <Message
              key={msg.sender + msg.body}
              classes={classes}
              msgData={msg}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MessageBox;
