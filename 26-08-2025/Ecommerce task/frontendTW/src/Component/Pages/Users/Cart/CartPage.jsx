import React, { useState, useEffect } from "react";
import UserLayout from "../../../Layout/LayoutUser";
import axios from "axios";
import PaymentModal from "../Payment/PaymentModel";

const CartPage = () => {
   const [cartItems, setCartItems] = useState([]);
   const [showPayment, setShowPayment] = useState(false);

   useEffect(() => {
      async function getCartItems() {
         try {
            const res = await axios.get("http://localhost:9000/user/showcart", {
               withCredentials: true,
            });

            const normalized = res.data.cart.map((item) => {
               let parsedImages = Array.isArray(
                  item.productDetails.vendorProductImages
               )
                  ? item.productDetails.vendorProductImages
                  : JSON.parse(item.productDetails.vendorProductImages || "[]");

               const images = parsedImages.map(
                  (img) => `http://localhost:9000/uploads/${img}`
               );

               return {
                  ...item,
                  productDetails: {
                     ...item.productDetails,
                     images,
                  },
               };
            });

            setCartItems(normalized);
         } catch (err) {
            console.error(err);
         }
      }
      getCartItems();
   }, []);

   const handleRemove = async (cartItemId) => {
      try {
         await axios.delete(
            `http://localhost:9000/user/removeitemfromcart/${cartItemId}`,
            { withCredentials: true }
         );

         alert("Item deleted successfully");
         setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
      } catch (err) {
         console.error(err);
      }
   };

   const handleConfirmPayment = async ({ method, transactionId }) => {
      setShowPayment(false);
      try {
         const res = await axios.post(
            "http://localhost:9000/user/ordercompletecart",
            { paymentMethod: method, transactionId },
            { withCredentials: true }
         );

         alert(
            ` ${res.data.message}\nTotal Price: $${res.data.totalOrderPrice}\nPaid via ${method}\nTransaction: ${transactionId}`
         );

         setCartItems([]);
      } catch (err) {
         console.error("Failed to order cart:", err);
         alert(err.response?.data?.error || "Failed to order whole cart");
      }
   };

   return (
      <UserLayout>
         <h1 className="text-2xl font-bold mb-6">My Cart</h1>

         {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
         ) : (
            <div className="space-y-4">
               {cartItems.map((item) => (
                  <div
                     key={item.id}
                     className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4"
                  >
                     <div className="w-28 h-28 flex-shrink-0 border rounded overflow-hidden">
                        {item.productDetails.images?.[0] ? (
                           <img
                              src={item.productDetails.images[0]}
                              alt={item.productDetails.vendorProductName}
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              No Image
                           </div>
                        )}
                     </div>

                     <div className="flex-1">
                        <h2 className="font-semibold text-lg">
                           {item.productDetails.vendorProductName}
                        </h2>
                        <p className="text-gray-600">
                           Price: ${item.productDetails.vendorProductPrice}
                        </p>
                        <p className="text-gray-600 text-sm">
                           Vendor: {item.productDetails.vendorName}
                        </p>
                        <p className="text-xs text-gray-500">
                           Added At:{" "}
                           {new Date(
                              item.dataValues.createdAt
                           ).toLocaleDateString()}
                        </p>
                     </div>

                     <button
                        onClick={() => handleRemove(item.dataValues.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                     >
                        Remove
                     </button>
                  </div>
               ))}

               <div className="flex justify-end mt-6">
                  <button
                     onClick={() => setShowPayment(true)}
                     className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                     Order Whole Cart
                  </button>
               </div>
            </div>
         )}

         {showPayment && (
            <PaymentModal
               onClose={() => setShowPayment(false)}
               onConfirm={handleConfirmPayment}
            />
         )}
      </UserLayout>
   );
};

export default CartPage;
