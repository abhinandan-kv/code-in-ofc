import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const ChangePassword = () => {
   const [message, setMessage] = useState("");
   const [loading, setLoading] = useState(false);

   const validationSchema = Yup.object({
      email: Yup.string()
         .email("Invalid email format")
         .required("Email is required"),
      password: Yup.string().required("Password is required"),
   });

   const handleSubmit = async (values, { resetForm }) => {
      try {
         setLoading(true);
         const res = await axios.post(
            "http://localhost:9000/user/forgotpassword",
            values
         );
         setMessage(res.data);
         resetForm();
      } catch (err) {
         setMessage(err.response?.data || "Something went wrong");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
         <div className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold">Forgot Password</h1>

            <Formik
               initialValues={{ email: "", password: "" }}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {() => (
                  <Form className="space-y-4">
                     <div>
                        <Field
                           type="email"
                           name="email"
                           placeholder="Email"
                           className="w-full border px-3 py-2 rounded"
                        />
                        <ErrorMessage
                           name="email"
                           component="p"
                           className="text-red-500 text-sm mt-1"
                        />
                     </div>

                     <div>
                        <Field
                           type="password"
                           name="password"
                           placeholder="Current Password"
                           className="w-full border px-3 py-2 rounded"
                        />
                        <ErrorMessage
                           name="password"
                           component="p"
                           className="text-red-500 text-sm mt-1"
                        />
                     </div>

                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                     >
                        {loading ? "Processing..." : "Send Reset Link"}
                     </button>
                  </Form>
               )}
            </Formik>

            {message && (
               <p className="text-center text-sm text-gray-700">{message}</p>
            )}
         </div>
      </div>
   );
};

export default ChangePassword;
