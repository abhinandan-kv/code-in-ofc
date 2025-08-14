import React from "react";
import logo from "../assets/logo_dark.svg";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SIGNUP_ENDPOINT = "http://localhost:9000/user/post";

const SignUp = () => {
  const [input, setInput] = useState({ name: null, email: null, password: null });
  //   const [success, setSuccess] = useState(false);

  //   function notify(){
  //     toast.success("User Created Successfully")
  //   }

  function handldeSumbit(e) {
    e.preventDefault();
    try {
      axios
        .post(SIGNUP_ENDPOINT, input)
        .then(() => {
          console.log("Successfully registered");
          toast.success("User Created Successfully");
          //   setSuccess(true);
        })
        .catch((err) => {
          console.error(err);                   //will handle dups and etc later 
          toast.error("Error Occurred");
        });
    } catch (err) {
      console.error(err);
    }
  }
  //   if(success){
  //     notify()
  //   }

  return (
    <>
      <main className="form-signin w-25 m-auto h-100 align-content-center ">
        <Toaster />
        <form>
          <img className="mb-4 justify-content-center w-100" src={logo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal text-center text-decoration-underline">Please Sign Up</h1>
          <div className="form-floating">
            <input
              type="name"
              className="form-control mb-3"
              id="floatingInput"
              placeholder="name"
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              required
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control mb-3"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              required
            />
            <label htmlFor="floatingPassword">Password</label>{" "}
          </div>
          {/* <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="checkDefault" />
                    <label className="form-check-label" htmlFor="checkDefault">
                      Remember me
                    </label>
                  </div> */}
          <button className="btn btn-dark w-100 py-2 my-3" onClick={handldeSumbit}>
            Sign Up
          </button>
          <p className="mt-5 mb-3 text-body-secondary text-center">Post Handlers Associations</p>
        </form>
      </main>
    </>
  );
};

export default SignUp;
