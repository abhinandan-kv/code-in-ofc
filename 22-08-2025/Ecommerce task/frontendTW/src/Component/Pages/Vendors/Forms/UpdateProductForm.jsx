import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateProductForm = ({ product, onSubmit }) => {
  const initialValues = {
    productName: product?.productName || "",
    productDescription: product?.productDescription || "",
    productPrice: product?.productPrice || "",
    productSpecifications: product?.productSpecifications || "",
    productStock: product?.productStock || "",
    avgDeliveryTime: product?.avgDeliveryTime || "",
    productCategory: product?.productCategory || "",
    productSubCategory: product?.productSubCategory || "",
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Required"),
    productPrice: Yup.number().required("Required"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="space-y-4">
        <div>
          <label>Product Name</label>
          <Field name="productName" className="w-full border p-2 rounded" />
          <ErrorMessage name="productName" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label>Description</label>
          <Field name="productDescription" as="textarea" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Price</label>
          <Field name="productPrice" type="number" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Product Specs</label>
          <Field name="productSpecifications" as="textarea" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Stock</label>
          <Field name="productStock" type="number" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Avg Delivery</label>
          <Field name="avgDeliveryTime" type="number" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>productCategory</label>
          <Field name="productCategory" as="textarea" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Product Sub Cartegory</label>
          <Field name="productSubCategory" as="textarea" className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Update Product
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateProductForm;
