import React from "react";

const SidebarDisplay = ({ id, title, body, reactions, tags, views }) => {
//   console.log("sidebar:-", title, body, reactions, tags, views);

  function truncate(str,maxLength) {
    let strLength = str.length;
    if (strLength <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength)+'...';
  }

  return (
    <>
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style={{ width: "380px" }}>
        <div className="list-group list-group-flush border-bottom scrollarea">
          <a href="#" className="list-group-item list-group-item-action  py-3 lh-sm" aria-current="true">
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">{truncate(title,30)}</strong> <small>{views}</small>
            </div>
            <div className="col-10 mb-1 small">{truncate(body,80)}</div>
          </a>
          {/* <a href="#" className="list-group-item list-group-item-action py-3 lh-sm">
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">List group item heading</strong> <small className="text-body-secondary">Tues</small>
            </div>
            <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
          </a> */}
        </div>
      </div>
    </>
  );
};

export default SidebarDisplay;
