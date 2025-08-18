import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductDisplay from "./ProductDisplay";

const PRODUCT_ENDPOINT = "https://dummyjson.com/products";




const Products = () => {
  const [response, setResponse] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!localStorage.getItem("products")) {
      axios
        .get(PRODUCT_ENDPOINT)
        .then((res) => {
          console.log(res.data.products);
          setResponse(res.data.products);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(response));
  }, []);

  // console.log("Response", response);
  // response.map((val,idx)=>{
  //   console.log({...val})
  // })

  return (
    <>
      <div className="container-fluid  row ">
        {response.map((val, idx) => (
          <ProductDisplay key={idx} {...val}  />
        ))}
      </div>
    </>
  );
};

export default Products;
