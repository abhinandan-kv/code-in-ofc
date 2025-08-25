import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UpdateProductForm = ({ product, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

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
    productName: Yup.string().required("Product name is required"),
    productPrice: Yup.number().required("Price is required").positive("Must be positive"),
    productStock: Yup.number().required("Stock is required").min(0, "Stock can't be negative"),
    avgDeliveryTime: Yup.number().required("Avg delivery time is required").min(1, "Must be at least 1 day"),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:9000/vendor/categories", {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  console.log(categories);
  console.log(subCategories);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ setFieldValue, values }) => (
        <Form className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Update Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <Field id="productName" name="productName" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="productName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Field id="productPrice" name="productPrice" type="number" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="productPrice" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Field id="productDescription" name="productDescription" as="textarea" rows="3" className="w-full border border-gray-400 p-2 rounded" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="productSpecifications" className="block text-sm font-medium text-gray-700 mb-1">
                Product Specs
              </label>
              <Field
                id="productSpecifications"
                name="productSpecifications"
                as="textarea"
                rows="3"
                className="w-full border border-gray-400 p-2 rounded"
              />
            </div>

            <div>
              <label htmlFor="productStock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <Field id="productStock" name="productStock" type="number" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="productStock" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="avgDeliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                Avg Delivery (days)
              </label>
              <Field id="avgDeliveryTime" name="avgDeliveryTime" type="number" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="avgDeliveryTime" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Field
                as="select"
                name="productCategory"
                className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-black"
                onChange={(e) => {
                  const categoryId = e.target.value;
                  setFieldValue("productCategory", categoryId);
                  setFieldValue("productSubCategory", "");
                  const selected = categories.find((cat) => String(cat.id) === categoryId);
                  setSubCategories(selected?.SubCategories || []);
                }}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="productCategory" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
              <Field as="select" name="productSubCategory" className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-black">
                <option value="">Select SubCategory</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="productSubCategory" component="div" className="text-red-500 text-xs mt-1" />
            </div>
          </div>

          <button type="submit" className="w-full py-2 mt-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition">
            Update Product
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProductForm;
