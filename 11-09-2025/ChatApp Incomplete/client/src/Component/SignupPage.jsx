import { useState } from "react";
import leftImg from "../public/signup.png";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_baseurl;
// console.log(BASE_URL);

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);

    try {
      console.log(`${BASE_URL}/user/signup`);
      const result = await axios.post(`${BASE_URL}/user/signup`, { username, email, password });
      toast.success(result.data.message);
      console.log("result", result);

      setTimeout(() => {
        navigate("/login");
        console.log("Timeout triggered?");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Error Occured");
    }
  }

  return (
    <>
      <div className="bg-black  text-white flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src={leftImg} alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 bg-black">
              <label htmlFor="username" className="block text-gray-400">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-black"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4 bg-black">
              <label htmlFor="Email" className="block text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-black"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-black"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
              Signup
            </button>
          </form>
          <div className="mt-6 text-gray-200 underline text-center">
            <Link to="/login" className="hover:underline">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
