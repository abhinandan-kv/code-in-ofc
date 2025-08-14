import React from "react";
import logo from "../assets/logo_dark.svg";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SIGNUP_ENDPOINT = "http://localhost:9000/user/signin";

const LoginPage = () => {
  const [input, setInput] = useState({ email: null, password: null });
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input);
    try {
      const response = axios
        .post(SIGNUP_ENDPOINT, input)
        .then((res) => {
          console.log("response :-", res);
          console.log("User Signed Successfully"), toast.success("Logged In");
          setLogged(true);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error Occurred");
        });

      console.log("result :-", response);
    } catch (err) {
      console.error(err);
    }
  }
  if (logged) {
    navigate("/");
  }
  
  return (
    <>
      <main className="form-signin w-25 m-auto h-100 align-content-center ">
        <Toaster />
        <form>
          <img className="mb-4 justify-content-center w-100" src={logo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal text-center text-decoration-underline">Please sign in</h1>
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
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {/* <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="checkDefault" />
            <label className="form-check-label" htmlFor="checkDefault">
              Remember me
            </label>
          </div> */}
          <button className="btn btn-dark w-100 py-2 my-3" type="Submit" onClick={handleSubmit}>
            Sign in
          </button>
          <p className="mt-5 mb-3 text-body-secondary text-center">Post Handlers Associations</p>
        </form>
      </main>
    </>
  );
};

export default LoginPage;
