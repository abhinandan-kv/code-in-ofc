import React, { useState } from "react";
import SidebarDisplay from "./SidebarDisplay";

const mobileView = window.innerWidth < 468;

const Sidebar = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : [];
  });
  const [displaySidebar, setDisplaySidebar] = useState(!mobileView) //will handle this later

//   console.log("data", data);

  let postArr = data;
//   console.log("postarr", postArr);

  return (
    <>
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style={{ width: "380px" }}>
        <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
          {/* <svg className="bi pe-none me-2" width="30" height="24" aria-hidden="true">
            <use xlink:href="#bootstrap"></use>
          </svg> */}

          {/* will change to user name display later after signup setup */}
          <span className="fs-5 fw-semibold">Post Handlers</span>
        </a>
      </div>

      {postArr ? postArr.map((val, idx) => <SidebarDisplay key={idx} {...val} />) : "Nothing to show here..."}

      {/* {data
        ? data.map((val, idx) => {
            <SidebarDisplay key={idx} {...val} />;
          })
        : "Nothing to show here..."} */}
    </>
  );
};

export default Sidebar;
