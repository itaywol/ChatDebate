import io from "socket.io-client";
export let socket;

export const initSocket = ({ side, nickname }) => {
  const url = `ws://localhost:4001/chat?room=demsvsreps&party=${side}&name=${nickname}`;
  socket = io.connect(url);
};
