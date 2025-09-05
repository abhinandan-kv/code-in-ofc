import React from "react";
import { useState } from "react";
import ChannelList from "./ChannelList";

const Chat = () => {
  const [channels, setChannels] = useState([{ id: 1, name: "first", participants: 10 }]);
  console.log(channels);
  return (
    <div>
      <div className="chat-app"></div>
      <ChannelList channels={channels} />
    </div>
  );
};

export default Chat;
