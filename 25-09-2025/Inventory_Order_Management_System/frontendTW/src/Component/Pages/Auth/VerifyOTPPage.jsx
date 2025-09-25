import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyOTPPage = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const validationSchema = Yup.object({
      otp: Yup.string()
         .length(6, "OTP must be 6 digits")
         .required("OTP is required"),
   });

   const handleSubmit = async (values) => {
      try {
         setLoading(true);
         const res = await axios.post(
            "http://localhost:9000/user/login/verifyotp",
            values,
            { withCredentials: true }
         );

         if (res.status === 200) {
            alert(res.data?.message || "Login successful");
            navigate("/user/dashboard");
         } else {
            alert(res.data?.message || "Invalid OTP");
         }
      } catch (err) {
         alert(err.response?.data || "OTP verification failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
         <div className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold">Verify OTP</h1>

            <Formik
               initialValues={{ otp: "" }}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {() => (
                  <Form className="space-y-4">
                     <div>
                        <Field
                           type="text"
                           name="otp"
                           placeholder="Enter OTP"
                           className="w-full border px-3 py-2 rounded"
                        />
                        <ErrorMessage
                           name="otp"
                           component="p"
                           className="text-red-500 text-sm mt-1"
                        />
                     </div>

                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                     >
                        {loading ? "Verifying..." : "Verify"}
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default VerifyOTPPage;
