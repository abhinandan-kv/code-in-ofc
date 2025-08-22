import React, { useState } from "react";
import UserLayout from "../../../Layout/LayoutUser";
import axios from "axios";

const UserSettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleToggle2FA = async () => {
    try {
      const res = await axios.post("http://localhost:9000/user/twofa")

      if (res.data.message == "OTP send successfully") {
        return new Promise(() => {
          const otp = promt("Enter otp");
          const jsonOTP = JSON.stringify(otp);
          console.log(otp, jsonOTP);
        })
          .then(() => axios.post("http://localhost:9000/user/twofa/verifyotp", jsonOTP))
          .catch((err) => console.error(err));
      }

      setIs2FAEnabled(!is2FAEnabled);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      console.log("Deactivating account...");
    }
  };

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md space-y-4">
        <button
          onClick={handleToggle2FA}
          className={`w-full py-2 rounded ${is2FAEnabled ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
        >
          {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>

        <button onClick={handleDeactivate} className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Deactivate Account
        </button>
      </div>
    </UserLayout>
  );
};

export default UserSettings;
