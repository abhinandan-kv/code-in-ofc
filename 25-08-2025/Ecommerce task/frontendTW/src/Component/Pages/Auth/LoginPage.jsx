import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
   const navigate = useNavigate();
   const [form, setForm] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         setLoading(true);

         const res = await axios.post(
            "http://localhost:9000/user/login",
            form,
            {
               withCredentials: true,
            }
         );

         console.log("Login Response:", res.data);

         if (res.data.message === "2FA email sent") {
            navigate("/verify-otp");
            return;
         }

         if (res.data.token) {
            console.log(res.data.token);
            localStorage.setItem("token", `Bearer ${res.data.token}`);
            localStorage.setItem("role", res.data.role);

            if (res.data.role === "admin") {
               navigate("/admin/dashboard");
            } else if (res.data.role === "vendor") {
               navigate("/vendor/dashboard");
            } else {
               navigate("/user/dashboard");
            }
         }
      } catch (err) {
         alert(err.response?.data);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex items-center justify-center  h-screen bg-gray-900">
         <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4"
         >
            <h1 className="text-2xl font-bold">Login</h1>
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={form.email}
               onChange={handleChange}
               className="w-full border px-3 py-2 rounded"
               required
            />
            <input
               type="password"
               name="password"
               placeholder="Password"
               value={form.password}
               onChange={handleChange}
               className="w-full border px-3 py-2 rounded"
               required
            />
            <button
               type="submit"
               disabled={loading}
               className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
               {loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex justify-between">
              <Link to="/signup">
                 <p className="text-black font-light text-base">Sign up</p>
              </Link>
              <Link to="/forgotpassword">
                 <p className="text-blue-600 font-light text-sm hover:underline">
                    Forgot Password?
                 </p>
              </Link>
            </div>
         </form>
      </div>
   );
};

export default LoginPage;
