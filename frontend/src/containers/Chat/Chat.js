import React, { Component } from "react";
import Header from "./ChatHeader";
import MessageBox from "./MessageBox";
import ChatComposer from "./ChatComposer";
import Loader from "../../components/Loader";
import { socket } from "../../socketUtils";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typingString: "",
      loading: true,
      messages: [],
      roomName: ""
    };

    socket.on("match", (data) => {
      console.log("match - data", data);
      let updatedMessages = [];
      updatedMessages.push(data);

      this.setState({ loading: false, messages: updatedMessages, roomName: data.sender });
    });

    socket.on("typing", ({ sender, body, senderId }) => {
      const { activeId } = this.props;
      if (senderId !== activeId) {
        this.setState({ typingString: `${body}...` });
      }
    });

    socket.on("stop-typing", ({ sender, body, senderId }) => {
      const { activeId } = this.props;
      if (senderId !== activeId) {
        this.setState({ typingString: "" });
      }
    });
  }

  setMessages = (messages) => {
    this.setState({messages})
  }

  componentDidMount() {
    this.props.hideNavBar();
  }

  render() {
    const { classes, nickname, side, history, setSide, activeId } = this.props;
    const { typingString, loading, messages, roomName } = this.state;

    if (loading) {
      return <Loader label={"Loading Page"} />;
    }

    return (
      <div className={classes.chatWrapper}>
        <Header
          classes={classes}
          nickname={nickname}
          side={side}
          typingString={typingString}
          history={history}
          setSide={setSide}
          roomName={roomName}
        />
        <MessageBox
          classes={classes}
          nickname={nickname}
          side={side}
          messages={messages}
          setMessages={this.setMessages}
          activeId={activeId}
        />
        <ChatComposer
          classes={classes}
          nickname={nickname}
          side={side}
          typingString={typingString}
        />
      </div>
    );
  }
}

export default Chat;
