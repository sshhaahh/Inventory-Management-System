import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orders = ({url}) => {
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${url}/cart/67d54afd442b3f4dcdcfa352`);

                if (res.data.success && res.data.cart && res.data.cart.items) {
                    const validOrders = res.data.cart.items.filter(order => order.product !== null);
                    setOrders(validOrders);

                    const total = validOrders.reduce((sum, order) => sum + (order.quantity * (order.product?.price || 0)), 0);
                    setTotalPrice(total);
                }
            } catch (e) {
                console.log("Orders fetch failed", e);
            }
        };

        fetchOrders();
    }, []);

    const handleRemoveOrder = async (productId) => {
        try {
            await axios.delete(`${url}/removefromcart`, {
                data: {
                    userId: "67d54afd442b3f4dcdcfa352",
                    productId: productId
                }
            })
            const updatedOrders = orders.filter(order => order.product._id !== productId);
            setOrders(updatedOrders);

            const total = updatedOrders.reduce((sum, order) => sum + (order.quantity * (order.product?.price || 0)), 0);
            setTotalPrice(total);
        } catch (error) {
            console.log("Failed to remove order:", error);
        }
    };

    const handleCheckout = async () => {
        try {
            const res = await axios.post(`${url}/cart/checkout`, { userId: "67d54afd442b3f4dcdcfa352" });

            if (res.data.success) {
                alert(`Checkout successful! Total Amount Paid: $${totalPrice.toFixed(2)}`);
                setOrders([]);  
                setTotalPrice(0);
            } else {
                alert("Checkout failed. Try again.");
            }
        } catch (error) {
            console.log("Checkout failed:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center font-serif font-bold text-2xl mb-6">
                <h1>Orders</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="border px-3 py-2">#</th>
                            <th className="border px-3 py-2">Product Name</th>
                            <th className="border px-3 py-2">Quantity</th>
                            <th className="border px-3 py-2">Price</th>
                            <th className="border px-3 py-2">Total</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-gray-50 odd:bg-gray-100">
                                    <td className="border px-3 py-2 text-center">{index + 1}</td>
                                    <td className="border px-3 py-2">{order.product?.name || "Unknown Product"}</td>
                                    <td className="border px-3 py-2 text-center">{order.quantity}</td>
                                    <td className="border px-3 py-2 text-center">${order.product?.price || "N/A"}</td>
                                    <td className="border px-3 py-2 text-center">
                                        ${order.product ? (order.quantity * order.product.price).toFixed(2) : "N/A"}
                                    </td>
                                    <td className="border px-3 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveOrder(order.product._id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border px-4 py-3 text-center text-gray-500">
                                    No Orders Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {orders.length > 0 && (
                <div className="flex justify-between items-center mt-6 p-4 border-t">
                    <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Orders;
