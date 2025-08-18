import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const ProductReviewForm = () => {
  const Products = ["Mouse", "Keyboard", "Headphone", "Monitor", "Printer", "Cooling Pad", "Graphics Card"];

  const validationSchema = Yup.object({
    product: Yup.string().required("Please select a product").oneOf(Products),
    name: Yup.string().required(),
    email: Yup.string().email("valid email format required").required(),
    phoneNumber: Yup.number().min(10).max(10).required(),
    title: Yup.string().required(),
    review: Yup.string().required(),
    rating: Yup.number().min(1).max(5).required(),
    date: Yup.date().default(() => new Date()),
    wouldRecommend: Yup.boolean().default(false),
  });

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    title: "",
    review: "",
    rating: "",
    date: new Date(),
    wouldRecommend: false,
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const productOptions = Products.map((val, idx) => (
    <option value={val} key={idx}>
      {val}
    </option>
  ));

  const renderError = (err) => <p>{err}</p>;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationScheme={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
        }}
      >
        <Form>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <div>
                <Field name="name" type="text" />
                <ErrorMessage name="name" render={renderError} />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <div>
                <Field name="email" type="email" />
                <ErrorMessage name="email" render={renderError} />
              </div>
            </div>
            <div>
              <label htmlFor="phno">Phone Number</label>
              <div>
                <Field name="phno" type="number" />
                <ErrorMessage name="phno" render={renderError} />
              </div>
            </div>
            <div>
              <label htmlFor="product">Product</label>
              <div>
                <Field name="product" as="select">
                  <option value={""}>Select a product</option>
                  {productOptions}
                </Field>
                <ErrorMessage name="product" render={renderError} />
              </div>
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <div>
                <Field name="title" type="text" />
                <ErrorMessage name="title" render={renderError} />
              </div>
            </div>

            <div>
              <label  htmlFor="review">
                Review
              </label>
              <div >
                <Field name="review" as="textarea" placeholder="Review" />
                <ErrorMessage name="review" render={renderError} />
              </div>
            </div>

            <div>
              <label htmlFor="rating">Rating</label>
              <div>
                <Field name="rating" type="number" />
                <ErrorMessage name="rating" render={renderError} />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="wouldRecommend">
                  <Field name="wouldRecommend" type="checkbox" />
                  Would recommend to Others
                </label>
              </div>
            </div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ProductReviewForm;
