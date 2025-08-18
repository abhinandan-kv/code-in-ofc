import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";

const FormData = () => {
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Name is Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid Email Address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />

            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormData;
