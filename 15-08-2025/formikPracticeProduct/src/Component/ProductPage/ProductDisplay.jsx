import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ProductExampleContext from "./ProductExampleContext";

// // Response Object
// {
//     "id": 1,
//     "title": "Essence Mascara Lash Princess",
//     "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//     "category": "beauty",
//     "price": 9.99,
//     "discountPercentage": 10.48,
//     "rating": 2.56,
//     "stock": 99,
//     "tags": [
//         "beauty",
//         "mascara"
//     ],
//     "brand": "Essence",
//     "sku": "BEA-ESS-ESS-001",
//     "weight": 4,
//     "dimensions": {
//         "width": 15.14,
//         "height": 13.08,
//         "depth": 22.99
//     },
//     "warrantyInformation": "1 week warranty",
//     "shippingInformation": "Ships in 3-5 business days",
//     "availabilityStatus": "In Stock",
//     "reviews": [
//         {
//             "rating": 3,
//             "comment": "Would not recommend!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Eleanor Collins",
//             "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//         },
//         {
//             "rating": 4,
//             "comment": "Very satisfied!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Lucas Gordon",
//             "reviewerEmail": "lucas.gordon@x.dummyjson.com"
//         },
//         {
//             "rating": 5,
//             "comment": "Highly impressed!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Eleanor Collins",
//             "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//         }
//     ],
//     "returnPolicy": "No return policy",
//     "minimumOrderQuantity": 48,
//     "meta": {
//         "createdAt": "2025-04-30T09:41:02.053Z",
//         "updatedAt": "2025-04-30T09:41:02.053Z",
//         "barcode": "5784719087687",
//         "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
//     },
//     "images": [
//         "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
//     ],
//     "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
// }

const CardDataContext = createContext(null);

const ProductDisplay = ({ id, title, description, thumbnail }) => {
  // console.log("product Display:- ",title, description, thumbnail)

  function handleClick(e) {
    console.log("button clicked");
    ProductExampleContext()
  }

  return (
    <>
      <CardDataContext value={{id, title,description, thumbnail}}>
        <section className="card-area pb-5 col-lg-3">
          <div className="container" onClick={handleClick}>
            <div className="row justify-content-center">
              <div className="single-card card-style-one">
                <div className="card-image">
                  <img src={thumbnail} alt="Image" />
                </div>
                <div className="card-content">
                  <h4 className="card-title">
                    <a href="javascript:void(0)">{title}</a>
                  </h4>
                  <p className="text">{description}</p>
                  <p className="text">Item: {id}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </CardDataContext>
    </>
  );
};

export default ProductDisplay;


