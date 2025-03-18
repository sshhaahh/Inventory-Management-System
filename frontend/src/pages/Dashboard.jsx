import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({url}) => {
    const [totalSellers, setTotalSellers] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalorders,setTotalorders]=useState(0);
    const [recentSellers, setRecentSellers] = useState([]);
    const [recentCategories, setRecentCategories] = useState([]);
    const [recentorders,setRecentorders]=useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            console.log(url)
            try {
                const sellersRes = await axios.get(`${url}/sellers`);
                if (sellersRes.data.success) {
                    setTotalSellers(sellersRes.data.data.length);
                    setRecentSellers(sellersRes.data.data.slice(-5)); 
                }

                const categoriesRes = await axios.get(`${url}/categories`);
                if (categoriesRes.data.success) {
                    setTotalCategories(categoriesRes.data.data.length);
                    setRecentCategories(categoriesRes.data.data.slice(-5)); 
                }

                const orderRes= await axios.get(`${url}/cart/67d54afd442b3f4dcdcfa352`);
                if(orderRes.data.success){
                    setTotalorders(orderRes.data.cart.items.length);
                    setRecentorders(orderRes.data.cart.items.slice(-5));
                    console.log(orderRes.data.cart.items[1].product.name)
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-4xl shadow-2xl  font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Total Sellers</h2>
                    <span className="text-2xl font-bold">{totalSellers}</span>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Total Categories</h2>
                    <span className="text-2xl font-bold">{totalCategories}</span>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <span className="text-2xl font-bold">{totalorders}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Recent Sellers</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">#</th>
                                <th className="border px-3 py-2">Name</th>
                                <th className="border px-3 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSellers.length > 0 ? (
                                recentSellers.map((seller, index) => (
                                    <tr key={seller._id} className="hover:bg-gray-50">
                                        <td className="border px-3 py-2">{index + 1}</td>
                                        <td className="border px-3 py-2">{seller.name}</td>
                                        <td className="border px-3 py-2">{seller.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border px-4 py-3 text-center text-gray-500">
                                        No Sellers Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Recent Categories</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">#</th>
                                <th className="border px-3 py-2">Category Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentCategories.length > 0 ? (
                                recentCategories.map((category, index) => (
                                    <tr key={category._id} className="hover:bg-gray-50">
                                        <td className="border px-3 py-2">{index + 1}</td>
                                        <td className="border px-3 py-2">{category.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="border px-4 py-3 text-center text-gray-500">
                                        No Categories Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>



                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2">#</th>
                                <th className="border px-3 py-2">Product Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentorders.length > 0 ? (
                                recentorders.map((order, index) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="border px-3 py-2">{index + 1}</td>
                                        <td className="border px-3 py-2">{order.product.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="border px-4 py-3 text-center text-gray-500">
                                        No Categories Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
