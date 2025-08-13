import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import IpAddress from "./Components/IpAddress";
import Header from "./Components/Header";
import FormExample from "./Components/FormExample";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./Components/Footer";
import Post from "./Components/Post";
import PostDisplay from "./Components/PostDisplay";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeletePost from "./Components/DeletePost";
import CreatePost from "./Components/CreatePost";
import UpdatePost from "./Components/UpdatePost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <IpAddress /> */}

          {/* <FormExample/> */}
          <Route
            path="/post"
            element={
              <>
                <Header />
                <div className="m-3">
                  <Post />
                </div>
                <Footer />
              </>
            }
          />
          {/* <PostDisplay/> */}
          <Route
            path="/delete"
            element={
              <>
                <Header />
                <div className="m-3">
                  <DeletePost />
                </div>
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/create"
            element={
              <>
                <Header />
                <div className="m-3">
                  <CreatePost />
                </div>
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/update"
            element={
              <>
                <Header />
                <div className="m-3">
                  <UpdatePost />
                </div>
                <Footer />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
