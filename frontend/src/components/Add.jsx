import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast} from "react-toastify";

const Add = ({ setAddScreen }) => {
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
    seller: "",
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, sellerRes] = await Promise.all([
          axios.get("http://localhost:3000/api/categories"),
          axios.get("http://localhost:3000/api/sellers"),
        ]);

        if (categoryRes.data.success) setCategories(categoryRes.data.data);
        if (sellerRes.data.success) setSellers(sellerRes.data.data);
      } catch (error) {
        console.error("Error fetching categories or sellers:", error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const addProduct = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/addproduct", formData);
      if (response.data.success) {
        toast.success("Product added successfully!");
        setAddScreen(false);
        window.dispatchEvent(new Event("productUpdated"));
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Add operation failed:", error);
      toast.error("An error occurred while adding the product.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.quantity || !formData.price || !formData.category || !formData.seller) {
      toast.error("All field Required!")
      return;
    }
    addProduct();
  };

  return (
    <div className="border shadow-lg flex flex-col gap-y-4 p-4 rounded-2xl bg-white">
      <h1 className="text-xl font-bold text-center">Add New Product</h1>

      <label htmlFor="name" className="font-medium">Name</label>
      <input type="text" required name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md w-full" />

      <label htmlFor="description" className="font-medium">Description</label>
      <textarea name="description" required value={formData.description} onChange={handleChange} className="border p-2 rounded-md w-full" />

      <label htmlFor="quantity" className="font-medium">Quantity</label>
      <input type="number" required name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 rounded-md w-full" />

      <label htmlFor="price" className="font-medium">Price</label>
      <input type="number" required name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded-md w-full" />

 
      <label htmlFor="category" className="font-medium">Category</label>
      <select name="category" required value={formData.category} onChange={handleChange} className="border p-2 rounded-md w-full">
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      <label htmlFor="seller" required className="font-medium">Seller</label>
      <select name="seller" value={formData.seller} onChange={handleChange} className="border p-2 rounded-md w-full">
        <option value="">Select a seller</option>
        {sellers.map((seller) => (
          <option key={seller._id} value={seller._id}>{seller.name}</option>
        ))}
      </select>

      <div className="flex gap-4 justify-center">
        <button onClick={() => setAddScreen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Add</button>
      </div>
    </div>
  );
};

export default Add;
