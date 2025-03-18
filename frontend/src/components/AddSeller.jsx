import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddSeller = ({ setAddScreen }) => {
    const [sellerData, setSellerData] = useState({
        name: "",
        email: "",
        number: "",
    });

    const handleChange = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/addseller", sellerData);
            if (res.data.success) {
                toast.success("Seller added successfully!");
                window.dispatchEvent(new Event("sellerUpdated"));
                setAddScreen(false);
            }
        } catch (error) {
            console.error("Error adding seller:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Add Seller</h2>

            <input 
                type="text"
                name="name"
                value={sellerData.name}
                onChange={handleChange}
                placeholder="Seller Name"
                className="w-full p-2 border rounded-md"
                required
            />

            <input 
                type="email"
                name="email"
                value={sellerData.email}
                onChange={handleChange}
                placeholder="Seller Email"
                className="w-full p-2 border rounded-md"
                required
            />

            <input 
                type="number"
                name="number"
                min={1000000000}
                value={sellerData.number}
                onChange={handleChange}
                placeholder="Seller Number"
                className="w-full p-2 border rounded-md"
                required
            />

            <button 
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
            >
                Add Seller
            </button>
        </form>
    );
};

export default AddSeller;
