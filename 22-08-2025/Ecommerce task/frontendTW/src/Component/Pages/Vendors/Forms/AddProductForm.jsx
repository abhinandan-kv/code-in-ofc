import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProductForm = ({ onSuccess }) => {
   const [files, setFiles] = useState([]);

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
   });

   const handleSubmit = async (values, { resetForm }) => {
      try {
         const formData = new FormData();
         Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
         });

         for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
         }

         const res = await axios.post(
            "http://localhost:9000/vendor/postproduct",
            formData,
            {
               withCredentials: true,
               headers: { "Content-Type": "multipart/form-data" },
            }
         );

         console.log("Addproductform", res)

         alert("✅ Product added successfully");
         resetForm();
         setFiles([]);
         if (onSuccess) onSuccess(res.data.product);
      } catch (err) {
         console.error(err);
         alert(err.response?.data || "Failed to add product");
      }
   };

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
      >
         <Form className="space-y-5">
            <h2 className="text-xl font-bold text-green-700 mb-2">
               Add New Product
            </h2>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images
               </label>
               <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="w-full border border-green-400 p-2 rounded"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Product Name
                  </label>
                  <Field
                     name="productName"
                     className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
                  />
                  <ErrorMessage
                     name="productName"
                     component="div"
                     className="text-red-500 text-xs mt-1"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Price
                  </label>
                  <Field
                     name="productPrice"
                     type="number"
                     className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
                  />
                  <ErrorMessage
                     name="productPrice"
                     component="div"
                     className="text-red-500 text-xs mt-1"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Stock
                  </label>
                  <Field
                     name="productStock"
                     type="number"
                     className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
                  />
                  <ErrorMessage
                     name="productStock"
                     component="div"
                     className="text-red-500 text-xs mt-1"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Avg Delivery Time (days)
                  </label>
                  <Field
                     name="avgDeliveryTime"
                     type="number"
                     className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
                  />
                  <ErrorMessage
                     name="avgDeliveryTime"
                     component="div"
                     className="text-red-500 text-xs mt-1"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Category
                  </label>
                  <Field
                     name="productCategory"
                     className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Sub Category
                  </label>
                  <Field
                     name="productSubCategory"
                     className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
               </label>
               <Field
                  name="productDescription"
                  as="textarea"
                  rows={3}
                  className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
               />
               <ErrorMessage
                  name="productDescription"
                  component="div"
                  className="text-red-500 text-xs mt-1"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specifications
               </label>
               <Field
                  name="productSpecifications"
                  as="textarea"
                  rows={2}
                  className="w-full border border-green-400 p-2 rounded focus:ring-2 focus:ring-green-600"
               />
               <ErrorMessage
                  name="productSpecifications"
                  component="div"
                  className="text-red-500 text-xs mt-1"
               />
            </div>

            <button
               type="submit"
               className="w-full py-2 mt-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
            >
               Add Product
            </button>
         </Form>
      </Formik>
   );
};

export default AddProductForm;
