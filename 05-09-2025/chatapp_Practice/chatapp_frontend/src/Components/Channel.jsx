import React from "react";

const Channel = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="channel-item">{data.id}</div>
      <div>{data.name}</div>
      <span>{data.participants}</span>
    </div>
  );
};

export default Channel;