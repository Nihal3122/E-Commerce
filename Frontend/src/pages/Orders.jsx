import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import moment from "moment";
import { displayCurrency } from "../helpers/DisplayCurrency";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/order/order-list",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setOrders(response.data.orderList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-24 px-4 lg:px-8">
        <div className="flex  justify-center">
          {orders.length === 0 && (
            <div className="flex flex-col mt-40 items-center justify-center h-full bg-gray-100 rounded-lg shadow-md p-20 ">
              <p className="text-center text-gray-600 text-lg font-medium">
                No Orders Available
              </p>
              <p className="text-center text-gray-500 text-sm mt-2">
                It looks like you haven’t placed any orders yet. Check back
                later or explore our products to make a purchase.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {orders.map((item, index) => (
            <div
              key={item.userId + index}
              className="bg-white shadow-md rounded-lg p-6 lg:p-8 border border-gray-200"
            >
              <p className="font-semibold text-xl mb-4 text-gray-800">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  {item.productDetails.map((product, index) => (
                    <div
                      key={product.productId + index}
                      className="flex items-start gap-4 border-b pb-4 mb-4"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-24 h-24 bg-gray-200  object-contain p-2 rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-lg text-gray-900">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="text-2xl font-medium text-gray-600">
                            {displayCurrency(product.price)}
                          </div>
                          <p className="text-gray-600">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col flex-1 items-center gap-10 ">
                  <div>
                    <div className="text-lg font-medium mb-2 text-gray-800">
                      Payment Details
                    </div>
                    <p className="text-gray-700">
                      Payment Method: {item.paymentDetails.payment_method_type}
                    </p>
                    <p className="text-gray-700">
                      Payment Status: {item.paymentDetails.payment_status}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-medium mb-2 ml-6 text-gray-800">
                      Shipping Details
                    </div>
                    {item.shipping_option.map((shipping, index) => (
                      <div
                        key={shipping.shipping_rate}
                        className="text-gray-700 ml-6"
                      >
                        Shipping Amount:{" "}
                        {displayCurrency(shipping.shipping_amount)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="font-semibold text-2xl  mt-4 text-gray-800 flex gap-3 items-center">
                Total Amount: <p className="text-green-600">{displayCurrency(item.totalAmount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
