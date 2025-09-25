import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForgotPassword =  () => {
  const [tempToken, setTempToken] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const gettingNewPW = async () => {
      const token = prompt("Enter your given token here");
      console.log(token);
      setTempToken(token);

      const password = prompt("Enter your new password");
      console.log(password);
      setNewPassword(password);

      const res = await axios.post(
        "http://localhost:9000/user/changepasswordthroughtoken",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(res.data.message =='Updated Successfully'){
        if(res.data.role == 'user'){
            navigate('/user/dashboard')
        }else if(res.data.role == 'vendor'){
            navigate('/vendor/dashboard')
        }
      }
      console.log(res);
    };

    gettingNewPW();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900" >
      {/* <button>Change Password</button> */}
    </div>
  );
};

export default PostForgotPassword;
