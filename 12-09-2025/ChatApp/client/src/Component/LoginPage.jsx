import { createContext, useEffect, useState } from "react";
import leftImg from "../public/signup.png";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./CustomHook/CustomHook";

const BASE_URL = import.meta.env.VITE_baseurl;
// console.log(BASE_URL);

// const UserContext = createContext({ name: "", email: "" });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "" });

  const [logged, setLogged] = useState(null);

  //adding a cstmhook for path settlement     -- not using this currently changed to navigate replace method
  // const path = useAuth();

  // useEffect(() => {
  //   function settingPath() {
  //     try {
  //       if (path == "/chat") {
  //         console.log(path, "?");
  //         navigate("/chat");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   settingPath;
  // }, []);

  console.log("path from useAuth hook- ", path);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(email, password);

    try {
      const result = await axios.post(
        `${BASE_URL}/user/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
      console.log("result", result);
      localStorage.setItem("token", `Bearer ${result.data.token}`); // not using this anywhere currently - for future sake

      if (result.status === 200) {
        setUserData({ ...userData, name: result.data.response.name, email: result.data.response.email });
        setTimeout(() => {
          setLogged(true);
          navigate("/chat", { replace: true });
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  }
  localStorage.setItem("curr_user_detail", JSON.stringify(userData));
  // console.log("userdata - ", userData);

  // if (logged) {
  //   return navigate("/chat");
  // }

  return (
    <>
      {/* <UserContext.Provider value={userData}> */}
      <div className="bg-black  text-white flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src={leftImg} alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <div className="mt-6 text-gray-200 underline text-center">
            <Link to="/signup" className="hover:underline">
              Signup Here
            </Link>
          </div>
        </div>
      </div>
      {/* </UserContext.Provider> */}
    </>
  );
}
