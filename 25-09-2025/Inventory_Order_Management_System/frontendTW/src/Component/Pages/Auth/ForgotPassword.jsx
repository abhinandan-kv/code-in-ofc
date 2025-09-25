import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:9000/user/forgotpassword", values, { withCredentials: true });
      console.log(res.data);
      setMessage(res.data);
      resetForm();
      navigate("/postforgotpassword");
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

        <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form className="space-y-4">
              <div>
                <Field type="email" name="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {loading ? "Processing..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>

        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
