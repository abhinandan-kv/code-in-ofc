import React from "react";
import { useState } from "react";
import { axiosAuthInstance } from "../Api/AxiosInstance";
import { useNavigate } from "@tanstack/react-router";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({ email: undefined, password: undefined });
  console.log(userDetails);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosAuthInstance.post("/auth/api/user/login", userDetails);
      console.log(result);
      if (result.status === 200) {
        alert("Auth done");
        navigate({ to: "/", replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={userDetails.password}
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
