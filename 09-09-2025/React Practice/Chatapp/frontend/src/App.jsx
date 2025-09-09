import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Toaster } from "sonner";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:3000");

function App() {
  const [input, setInput] = useState("");
  // const [chatHistory, setChatHistory] = useState(() => {
  //   const result = localStorage.getItem("chat");
  //   return result ? JSON.parse(result) : [];
  // });

  //showing userName form
  const [usernameSelected, setUsernameSelected] = useState(false);
  const [username, setUsername] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  const [userID, setUserID] = useState("");

  const [userMsg, setUserMsg] = useState([]);

  function handleClick(e) {
    e.preventDefault();
    // console.log(input);
    // socket.emit("message", input);

    // pvt msg
    socket.emit("private message", {
      input,
      to: userID,
    });

    // setChatHistory((prev) => [...prev, input]);

    // console.log(chatHistory);
  }

  // useEffect(() => {
  //   localStorage.setItem("chat", JSON.stringify(chatHistory));
  //   // console.log("useEffect ran");
  // }, [chatHistory]);

  // username handling
  function handleUsernameConfirm(e) {
    e.preventDefault();
    setUsernameSelected(true);
    socket.auth = { username };
    socket.connect();
  }

  // getting session details
  useEffect(() => {
    function created() {
      const sessionID = localStorage.getItem("sessionID");

      if (sessionID) {
        setUsernameSelected(true);
        socket.auth = { sessionID };
        socket.connect();
      }
    }

    return created();
  }, []);

  //getting session details and saving in localstorage
  socket.on("session", ({ sessionID, userID }) => {
    socket.auth = { sessionID };
    localStorage.setItem("sessionID", sessionID);

    socket.userID = userID;
  });

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      setUsernameSelected(false);
    }
  });

  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });

    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    console.log(users);
    setAllUsers(users);
  });

  console.log(allUsers);

  socket.on("private message", ({ input, from }) => {
    console.log({ input, from });
    console.log("ALL USERS LENGTH", allUsers.length);
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      if (user.userID === from) {
        console.log("INSIDE IF LOOP");
        // user.messages.push({
        //   input,
        //   fromSelf: false,
        // });
        setUserMsg((prev) => [...prev, input]); // uncaught bug- the number of msges getting printed is same as times of msg we are sending like 2 duplicates if sending 2nd msg
      }
      // console.log(user);
    }

    console.log(userMsg);
  });

  return (
    <>
      <Toaster position="top-center" richColors />
      {usernameSelected ? (
        <>
          <div>
            <h5>Available Users:</h5>
            <ul>
              {allUsers.map((val, idx) => (
                <li key={idx}>
                  UserID: {val.userID} | Name: {val.username}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Enter userid</h4>
            <input placeholder="UserID" onChange={(e) => setUserID(e.target.value)} />

            <h5>Chat Area</h5>
            <input placeholder="Message" onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Send</button>
          </div>
          {userMsg && (
            <div>
              <h5>Chat history</h5>
              {userMsg.map((val, idx) => (
                <p key={idx}>{val}</p>
              ))}
            </div>
          )}
          {/* <div>
            <h5>Chat history</h5>
            {chatHistory.map((val, idx) => (
              <p key={idx}>{val}</p>
            ))}
          </div> */}
        </>
      ) : (
        <div>
          <h5>Enter Your Username</h5>
          <input placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleUsernameConfirm}>Confirm</button>
        </div>
      )}
    </>
  );
}

export default App;
