import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProductForm = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:9000/vendor/categories", {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const initialValues = {
    productName: "",
    productDescription: "",
    productPrice: "",
    productSpecifications: "",
    productStock: "",
    avgDeliveryTime: "",
    productCategory: "",
    productSubCategory: "",
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Required"),
    productDescription: Yup.string().required("Required"),
    productPrice: Yup.number().required("Required"),
    productSpecifications: Yup.string().required("Required"),
    productStock: Yup.number().required("Required"),
    avgDeliveryTime: Yup.number().required("Required"),
    productCategory: Yup.string().required("Category is required"),
    productSubCategory: Yup.string().required("Subcategory is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const categoryObj = categories.find((c) => String(c.id) === values.productCategory);
      const subCategoryObj = subcategories.find((s) => String(s.id) === values.productSubCategory);

      const payload = {
        ...values,
        productCategory: categoryObj?.name || values.productCategory,
        productSubCategory: subCategoryObj?.name || values.productSubCategory,
      };

      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await axios.post("http://localhost:9000/vendor/postproduct", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");
      resetForm();
      setFiles([]);
      if (onSuccess) onSuccess(res.data.product);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to add product");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Add New Product</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="w-full border border-gray-400 p-2 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <Field name="productName" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="productName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <Field name="productPrice" type="number" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="productPrice" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <Field name="productStock" type="number" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="productStock" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avg Delivery Time (days)</label>
              <Field name="avgDeliveryTime" type="number" className="w-full border border-gray-400 p-2 rounded" />
              <ErrorMessage name="avgDeliveryTime" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Field
                as="select"
                name="productCategory"
                className="w-full border border-gray-400 p-2 rounded"
                onChange={(e) => {
                  const categoryId = e.target.value;
                  setFieldValue("productCategory", categoryId);
                  setFieldValue("productSubCategory", "");
                  const selected = categories.find((cat) => String(cat.id) === categoryId);
                  setSubcategories(selected?.SubCategories || []);
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
              <Field as="select" name="productSubCategory" className="w-full border border-gray-400 p-2 rounded">
                <option value="">Select SubCategory</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="productSubCategory" component="div" className="text-red-500 text-xs mt-1" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Field name="productDescription" as="textarea" rows={3} className="w-full border border-gray-400 p-2 rounded" />
            <ErrorMessage name="productDescription" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
            <Field name="productSpecifications" as="textarea" rows={2} className="w-full border border-gray-400 p-2 rounded" />
            <ErrorMessage name="productSpecifications" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <button type="submit" className="w-full py-2 mt-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition">
            Add Product
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
