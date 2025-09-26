import React, { useState } from "react";
import UserLayout from "../../../Layout/LayoutUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserSettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [userDetail, setUserDetails] = useState({ name: null, email: null, phone: null, createdAt: null });

  const navigate = useNavigate();

  useEffect(() => {
    const get2FaStatus = async () => {
      const res = await axios.get("http://localhost:9000/user/twofactorauthenticationstatus", { withCredentials: true });
      // console.log(res.data);
      const date = res.data.createdAt;
      const parsedDate = new Date(date).toLocaleDateString();
      // console.log(parsedDate);
      setUserDetails({ name: res.data.name, email: res.data.email, phone: res.data.phoneNumber, createdAt: parsedDate });

      if (res.data.is2Fa == "true") {
        setIs2FAEnabled(true);
      } else {
        setIs2FAEnabled(false);
      }
    };

    get2FaStatus();
  }, []);
  //   console.log(userDetail);
  const handleToggle2FA = async () => {
    try {
      const res = await axios.post("http://localhost:9000/user/twofa", {}, { withCredentials: true });

      console.log("Enable 2FA Response:", res.data);
      if (res.data.message === "OTP sent successfully") {
        alert("OTP sent to your email. Please verify.");
        navigate("/verify-2fa-setup");
      } else {
        alert(res.data.message || "Failed to start 2FA process");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while toggling 2FA");
    }
  };

  const handleDeactivate = async () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      try {
        const res = await axios.patch(
          "http://localhost:9000/user/deactivate",
          {},
          {
            withCredentials: true,
          }
        );
        alert(res.data.message);
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert("Failed to deactivate account");
      }
    }
  };

  const handlePasswordChange = async () => {
    const password = prompt("Enter your new password");

    try {
      const res = await axios.patch("http://localhost:9000/user/changepassword", { password }, { withCredentials: true });

      if (res.data.message == "Password updated successfully") {
        alert("Password has been updated");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6 underline">Account Settings</h1>
      <div className="flex flex-col mb-10">
        <h1 className=" font-medium text-xl mb-4">Name: {userDetail.name}</h1>
        <p className="text-lg  text-gray-700 mb-2">Email: {userDetail.email}</p>
        <p className="text-lg  text-gray-700 mb-2">Phone: {userDetail.phone}</p>
        <p className="text-lg  text-gray-700 mb-2">Joined At: {userDetail.createdAt} days</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md space-y-4">
        <button
          onClick={handleToggle2FA}
          className={`w-full py-2 rounded ${is2FAEnabled ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
        >
          {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>

        <button onClick={handlePasswordChange} className="w-full py-2 bg-stone-600 text-white rounded hover:bg-gray-700">
          Change Password
        </button>

        <button onClick={handleDeactivate} className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Deactivate Account
        </button>
      </div>
    </UserLayout>
  );
};

export default UserSettings;
