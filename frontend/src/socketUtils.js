import io from "socket.io-client";
export let socket;

export const initSocket = ({ side, nickname }) => {
  const url = `ws://141.226.246.33:4001/chat?theme=demsvsreps&party=${side}&name=${nickname}`;
  socket = io.connect(url);
};
