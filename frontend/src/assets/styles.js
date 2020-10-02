import { requirePropFactory } from "@material-ui/core";

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
  chatAsLeft: {
    "&:hover": {
      background:
        "linear- gradient(0deg, rgba(255, 255, 255, 1) 0 %, rgba(81, 96, 176, 1) 50 %, rgba(255, 255, 255, 1) 100 %) !important",
      transform: "translate3d(0,-10px,0) !important",
      boxShadow:
        "0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22) !important",
    },
  },
  chatAsRight: {
    "&:hover": {
      backgroundColor: "red",
      transform: "translate3d(0,-10px,0)",
      boxShadow: "0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)",
    },
  },
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
    height: 60,
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
    // backgroundColor: "lightgrey",
  },
  messageBoxBackgroundImage: {
    backgroundImage:
      "url(https://c7.alamy.com/comp/W7K6KY/elephant-and-donkey-usa-pattern-seamless-republican-and-democrat-party-america-background-vector-texture-W7K6KY.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    position: "fixed",
    opacity: 0.1,
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  messageWrapper: {
    margin: "5px 5px 5px 10px",
    padding: "10px",
    display: "flex",
    borderRadius: 7,
    backgroundColor: "grey",
    width: "max-content",
    zIndex: 10,
  },
  messageRightSide: {
    marginLeft: "auto",
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
    position: "relative",
    zIndex: 10,
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
    margin: "0px 5px",
    "& button": {
      width: 40,
      height: 40,
    },
  },
  chatComposerSend: {
    transition: "0.3s all",
    color: "blue",
  },
  // NavBar
  navBarWrapper: {
    paddingLeft: 20,
    position: "fixed",
    top: 0,
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 50,
    background: "grey",
  },
  navItem: {
    cursor: "pointer",
    paddingLeft: 20,
  },
});

export default useStyles;
