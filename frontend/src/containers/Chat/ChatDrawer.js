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
class ChatDrawer extends Component {
  state = {
    isNotesOpen: false,
  };

  toggleNotes = () => {
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  render() {
    const { classes, toggleDrawer, isDrawerOpen } = this.props;
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
          <IconButton onClick={toggleDrawer}>{<ChevronRightIcon />}</IconButton>
        </div>

        <Divider />
        <List>
          {["Home Page", "Next Opponent"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Notes"].map((text, index) => (
            <ListItem button key={text} onClick={this.toggleNotes}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        {isNotesOpen && <Notes classes={classes} isNotesOpen={isNotesOpen} />}
      </Drawer>
    );
  }
}

export default ChatDrawer;
