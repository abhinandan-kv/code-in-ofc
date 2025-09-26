import React from "react";
import { Formik, Form, Field } from "formik";

const DeleteProductForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ productId: "" }} onSubmit={onSubmit}>
      <Form className="space-y-4">
        <div>
          <label>Product ID</label>
          <Field name="productId" type="text" className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Delete Product
        </button>
      </Form>
    </Formik>
  );
};

export default DeleteProductForm;
