import React from "react";
import { useState } from "react";
import { axiosAuthInstance } from "../Api/AxiosInstance";

const SignupPage = () => {
  const [userDetails, setUserDetails] = useState({ username: undefined, email: undefined, password: undefined });
  console.log("inside signuppapge");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosAuthInstance.post("/auth/api/user/signup", userDetails);
      console.log(result);
      if (result.status === 200) {
        alert("Signup Successful");
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
          placeholder="username"
          value={userDetails.username}
          onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
        />
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

export default SignupPage;
