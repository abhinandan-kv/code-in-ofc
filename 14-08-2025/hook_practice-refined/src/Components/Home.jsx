import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-5 align-content-center justify-content-center vh-100 vw-100 align-items-center ">
          <ul style={{ listStyleType: "none" }}  className="d-flex gap-4 display-6  ">
            <li>
              <Link to="/post" className='home_navigation'>Show Posts</Link>
            </li>
            <li>
              <Link to="/delete" className='home_navigation'>Delete Post</Link>
            </li>
            <li>
              <Link to="/create" className='home_navigation'>Create New Post </Link>
            </li>
            <li>
              <Link to="/update" className='home_navigation'>Update Exiting Post</Link>
            </li>
          </ul>
      </div>
    </>
  );
};

export default Home;
