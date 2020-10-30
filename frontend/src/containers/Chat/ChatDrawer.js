import React, { Component } from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Notes from "./Notes";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CreateSharpIcon from "@material-ui/icons/CreateSharp";
class ChatDrawer extends Component {
  state = {
    isNotesOpen: false,
  };

  toggleNotes = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  render() {
    const { classes, toggleDrawer, isDrawerOpen, moveToRoot } = this.props;
    const { isNotesOpen } = this.state;
    return (
      <Drawer
        variant="persistent"
        anchor="right"
        open={isDrawerOpen}
        classes={{
          paper: classes.notesDrawer,
        }}
      >
        <div className={classes.drawerHeader} style={{ height: 55 }}>
          {/* <IconButton onClick={toggleDrawer}>{<ChevronRightIcon />}</IconButton> */}
          <Typography variant="h5" style={{ fontSize: "1.2rem" }}>
            Menu
          </Typography>
        </div>

        <Divider />
        <List>
          <ListItem button onClick={moveToRoot}>
            <ListItemIcon>
              <HomeSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"Home Page"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Next Opponent"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.toggleNotes}>
            <ListItemIcon>
              <CreateSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"Notes"} />
          </ListItem>
        </List>

        <Notes classes={classes} isNotesOpen={isNotesOpen}  />
      </Drawer>
    );
  }
}

export default ChatDrawer;
