import React, { Component } from "react";
import Message from "./Message";

class MessageBox extends Component {
  state = {
    demoData: [
      { id: 1, sender: "Tom", body: "Hello there !" },
      { id: 2, sender: "Eden", body: "Hey how are you ?" },
      { id: 3, sender: "Tom", body: "Fine, and you?" },
    ],
  };

  // appendNewMessage = (e) => {
  //   const payload = {
  //     id:
  //   }
  // }

  render() {
    const { classes } = this.props;
    const { demoData } = this.state;
    return (
      <div className={classes.messageBoxWrapper}>
        {demoData.map((msg) => (
          <Message key={msg.id} classes={classes} msgData={msg} />
        ))}
      </div>
    );
  }
}

export default MessageBox;
