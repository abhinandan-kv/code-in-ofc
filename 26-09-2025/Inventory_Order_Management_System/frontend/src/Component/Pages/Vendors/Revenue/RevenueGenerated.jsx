import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// {
//   "id": 1,
//   "userId": 10,
//   "productId": 1,
//   "vendorId": 8,
//   "productUUID": "23775e74-1a15-4957-8921-9d21f6abe0d0",
//   "productQualitity": 1,
//   "productTotalPrice": 100,
//   "productEstimationTime": "\"1day\",",
//   "currentStatus": "Shipped",
//   "isDelivered": true,
//   "createdAt": "2025-08-21T08:18:04.000Z",
//   "updatedAt": "2025-08-25T09:18:33.000Z",
//   "deletedAt": null
// }

// {
//   "productTotalPrice": 100,
//   "userId": 10
// }

const RevenueGenerated = () => {
//   const [totalRevenue, setTotalRevenue] = useState([]);

//   useEffect(() => {
//     const getRevenue = async () => {
//       try {
//         const res = await axios.get("http://localhost:9000/vendor/totalrevenue", { withCredentials: true });

//         console.log(res.data.revenue);

//         // const orders = res.data.revenue

//         // orders.forEach(element => {

//         // });

//         const orders = res.data.revenue;

//         const revenue = {};
//         const product = {};
//         orders.forEach((order, idx) => {
//           // console.log(order.productTotalPrice);
//           // amount = amount + order.productTotalPrice;

//           revenue[idx] = (revenue[idx] || 0) + order.productTotalPrice;

//           const productId = order.productId || "Unknown Product";
//           product[productId] = (product[productId] || 0) + order.productQualitity;
//         });

//         const revenueFormatted = Object.entries(revenue).map(([month, revenue]) => ({
//           month,
//           revenue,
//         }));

//         const productsFormatted = Object.entries(product).map(([product, sold]) => ({
//           product,
//           sold,
//         }));

//         console.log(revenueFormatted, productsFormatted);

//         setTotalRevenue(res.data.revenue);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getRevenue();
//   }, []);

//   console.log(totalRevenue);

  return (
    <>
      {/* <div>
        {totalRevenue.map((ele, idx) => {
          return (
            <p>
              {ele.productTotalPrice} | {ele.userId}
            </p>
          );
        })}
      </div> */}
    </>
  );
};

export default RevenueGenerated;
