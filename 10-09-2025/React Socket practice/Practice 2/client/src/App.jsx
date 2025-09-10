import { useEffect } from "react";
import "./App.css";
import { socket } from "./component/socket";
import Input from "./component/Input";
import { useState } from "react";

function App() {
const [msg, setMsg] = useState('')
const [join, setJoin] = useState(false)

  function handleInput(evt) {
    let { name, value } = evt.target;
    console.log(`${name}:${value}`);
    setMsg(evt.target.value)
  }

  function handleSubmit(evt){
    console.log(msg)
    socket.emit('send_message', msg)
  }
  function handleJoining(evt){
    
  }

  useEffect(() => {
    socket.on("connection", (socket) => {
      console.log(socket);
    });
  }, []);

  if(!join){
    <div>
        <Input name="username" placeholder={"Enter Username"} handleInput={handleInput} />
        <button onClick={handleJoining} >Set Username</button>
      </div>
  }


  return (
    <>
      <div>
        <Input name="message" placeholder={"Enter message"} handleInput={handleInput} />
        <button onClick={handleSubmit} >Send</button>
      </div>
    </>
  );
}

export default App;
