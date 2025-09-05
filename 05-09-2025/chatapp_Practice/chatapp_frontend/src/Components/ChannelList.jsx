import React from "react";
import Channel from "./Channel";

const ChannelList = ({ channels }) => {
  console.log(channels);
  let list = `There is no channels to show`;
  if (channels) {
    list = channels.map((c) => <Channel key={c.id} data={c} />);
  }
  return (
    <div>
      <div className="channel-list"></div>
      {list}
    </div>
  );
};

export default ChannelList;
