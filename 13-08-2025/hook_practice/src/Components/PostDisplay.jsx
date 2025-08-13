import React from "react";

import { FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const PostDisplay = ({ id,title, body, reactions, tags, views }) => {
  console.log("POSTS:-", title, body, reactions, tags, views);
  return (
    <>
      <div className="card " style={{ maxWidth: "30%" }}>
        <div className="card-body d-flex flex-column justify-content-between ">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-around mb-3  ">
              <div className="d-flex align-items-center gap-1">
                <FaThumbsUp />
                <p className="m-0">{reactions.likes}</p>
              </div>
              <div className="d-flex align-items-center gap-1">
                <FaThumbsDown />
                <p className="m-0">{reactions.dislikes}</p>
              </div>
              <div className="d-flex align-items-center gap-1 ">
                <FaEye />
                <p className="m-0">{views}</p>
              </div>
            </div>
            <div className="d-flex">
              <p className="m-0">Tags: {tags.join(",")}</p>
              <p className="ms-auto ">Id:{id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDisplay;
