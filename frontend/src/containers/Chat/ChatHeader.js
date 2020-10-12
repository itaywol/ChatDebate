import React from "react";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {STRINGS} from '../../../src/constants';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {ROUTERPATHS} from '../../constants';

const ChatHeader = ({ classes, nickname, side, typingString, history, setSide}) => {
  
  const opponentSide = side === STRINGS.LEFT_HEADER ? STRINGS.RIGHT_HEADER : STRINGS.LEFT_HEADER;

  const moveToRoot = () => {
    history.push(ROUTERPATHS.ROOT);
    setSide("");
  }

  return (
    <div className={classes.headerWrapper}>
      <Avatar classes={{ root: classes.headerAvatar }}>T</Avatar>
      <div className={classes.headerContent}>
        <Typography>Tom</Typography>
        <Typography style={{ color: "grey" }}>{typingString ? typingString : opponentSide}</Typography>
      </div>

      <div style={{display: 'flex', alignItems: 'center', marginLeft:'auto', marginRight: 35}}>
        <Tooltip title="Next Opponent">
          <div>
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
          </div>
        </Tooltip>

        <Tooltip title="Disconnect">
          <div>
          <IconButton onClick={moveToRoot}>
            <ExitToAppIcon />
          </IconButton>
          </div>
        </Tooltip>
      </div>


    </div>
  );
};

export default ChatHeader;
