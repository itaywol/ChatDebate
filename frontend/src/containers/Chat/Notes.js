import React, { Component } from "react";

import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
class Notes extends Component {
  render() {
    const { classes, isNotesOpen } = this.props;

    return (
      <Collapse in={isNotesOpen} timeout="2000" component="div" unmountOnExit>
        <div style={{ height: 400 }}>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 8,
            }}
          >
            <TextField label="Notes" multiline rows={15} variant="outlined" />
          </section>
          <Divider />
        </div>
      </Collapse>
    );
  }
}

export default Notes;
