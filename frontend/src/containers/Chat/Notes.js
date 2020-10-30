import React, { Component } from "react";

import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
class Notes extends Component {
  state = {
    text: ""
  }


  componentDidMount(){
    const textFromLocal = localStorage.getItem('notes-text');
    this.setState({text: textFromLocal});    
  }

  onChange = e => {
    const {text} = this.state;
    this.setState({text: e.target.value}, () => {
      localStorage.setItem('notes-text', text);
    })
  }

  render() {
    const { classes, isNotesOpen } = this.props;
    const {text} = this.state;
    return (
      <Collapse in={isNotesOpen} timeout="auto" >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 8,
            }}
          >
            <TextField 
              style={{width:250}}
              label="Notes"
              multiline
              onChange={this.onChange}
              rows={20} 
              variant="outlined" 
              value={this.state.text} 
            />

          </div>
          <Divider />
        </div>
      </Collapse>
    );
  }
}

export default Notes;
