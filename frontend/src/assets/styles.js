const useStyles = (theme) => ({
  // myCustomClass: {
  //   color: theme.status.danger,
  //   fontSize: 40,
  // },
  appWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "100vh",
    width: "100%",
    overflowX: "hidden",
  },
  //ChatAs.js
  chatAsTitle: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  chatAsCardsWrapper: {
    display: "flex",
    marginTop: 25,
  },
  // chatAsCards: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "grey",
  //   width: "100%",
  //   height: "100%",
  //   margin: "0px 10px",
  // },
  chatAsCard: {
    width: 200,
    height: 150,
    WebkitTransition: "all .3s",
    transition: "all .3s",
    cursor: "pointer",
    position: "relative",
    zIndex: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
    borderRadius: "0 20px 0 20px",
    margin: "10px 30px",
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "red",
      transform: "translate3d(0,-10px,0)",
      boxShadow: "0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)",
    },
  },
  // Chat.js
  chatWrapper: {
    height: "inherit",
    width: "inherit",
    display: "flex",
    flexDirection: "column",
  },
  // Header.js
  headerWrapper: {
    display: "flex",
    padding: "0px 20px",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderBottom: "1px solid grey",
  },
  headerAvatar: {
    width: 35,
    height: 35,
  },
  headerContent: {
    paddingLeft: 10,
  },
  // MessageBox.js
  messageBoxWrapper: {
    borderBottom: "1px solid lightgrey",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "lightgrey",
  },
  messageWrapper: {
    margin: "5px 5px 5px 10px",
    padding: "10px",
    display: "flex",
    borderRadius: 7,
    backgroundColor: "grey",
    width: "max-content",
  },
  // ChatComposer
  ChatComposerWrapper: {
    width: "100%",
    minHeight: 50,
    maxHeight: 80,
    borderTop: "1px solid grey",
    background: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chatComposerContent: {
    display: "flex",
    background: "white",
    width: "90%",
    height: "80%",
    borderRadius: 30,
    marginLeft: 15,
  },
  chatComposerIcons: {
    display: "flex",
    margin: "0 auto",
  },
});

export default useStyles;
