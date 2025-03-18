import axios from "axios";
import { useEffect, useState } from "react";
import AddSeller from "../components/AddSeller";

const Seller = ({url}) => {
    const [allSellers, setAllSellers] = useState([]);
    const [addScreen, setAddScreen] = useState(false);
    const [editScreen, setEditScreen] = useState(false);
    const [forEdit, setForEdit] = useState(null);

    const fetchSellers = async () => {
        try {
            const res = await axios.get(`${url}/sellers`);
            if (res.data.success) {
                setAllSellers(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching sellers:", error);
        }
    };

    useEffect(() => {
        fetchSellers();
        const handleSellerUpdate = () => fetchSellers();
        window.addEventListener("sellerUpdated", handleSellerUpdate);
        return () => window.removeEventListener("sellerUpdated", handleSellerUpdate);
    }, []);


    const handleDelete = async (id) => {
       
        if (window.confirm("Are you sure you want to delete this seller?")) {
            try {
                await axios.delete(`${url}/deleteseller/${id}`);
                fetchSellers();
            } catch (error) {
                console.error("Error deleting seller:", error);
            }
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center font-serif font-bold text-2xl mb-6">
                <h1>Sellers</h1>
                <button 
                    className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => setAddScreen(true)}
                >
                    Add Seller
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="border px-3 py-2">#</th>
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2 hidden sm:table-cell">Email</th>
                            <th className="border px-3 py-2 hidden sm:table-cell">Number</th>

                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSellers.length > 0 ? (
                            allSellers.map((seller, index) => (
                                <tr key={seller._id} className="hover:bg-gray-50 odd:bg-gray-100">
                                    <td className="border px-3 py-2 text-center">{index + 1}</td>
                                    <td className="border px-3 py-2">{seller.name}</td>
                                    <td className="border px-3 py-2 hidden sm:table-cell">{seller.email}</td>
                                    <td className="border px-3 py-2 hidden sm:table-cell">{seller.number}</td>

                                    <td className="border px-3 py-2 flex gap-2 justify-center">
                                       

                                        <button
                                            onClick={() => handleDelete(seller._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border px-4 py-3 text-center text-gray-500">
                                    No Sellers Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            
            {addScreen && (
                <div className="fixed inset-0 flex-col flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
                        <AddSeller setAddScreen={setAddScreen} />
                    <button className="w-full text-white mt-2 rounded-sm p-2 bg-red-600" onClick={()=>setAddScreen(false)}>Close</button>
                    </div>

                </div>
            )}

            
        </div>
    );
};

export default Seller;
