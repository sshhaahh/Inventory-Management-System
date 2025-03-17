import React, { useState, useEffect } from "react";
import axios from "axios";

const Edit = ({ setEditScreen, forEdit }) => {
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
    if (forEdit) {
      setFormData({
        name: forEdit?.name || "",
        description: forEdit?.description || "",
        quantity: forEdit?.quantity || "",
        price: forEdit?.price || "",
        category: forEdit?.category?._id || "",
        seller: forEdit?.seller?._id || "",
      });
    }
  }, [forEdit]);

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

  const editProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/updateproduct/${forEdit._id}`,
        formData
      );
      if (response.data.success) {
        alert("Product updated successfully!");
        setEditScreen(false);
        window.dispatchEvent(new Event("productUpdated"));
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Edit operation failed:", error);
      alert("An error occurred while updating the product.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct();
  };

  return (
    <div className="border shadow-lg flex flex-col gap-y-4 p-4 rounded-2xl bg-white">
      <h1 className="text-xl font-bold text-center">Edit Product</h1>

      <label htmlFor="name" className="font-medium">Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded-md w-full" />

      <label htmlFor="description" className="font-medium">Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded-md w-full" />

      <label htmlFor="quantity" className="font-medium">Quantity</label>
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 rounded-md w-full" />

      <label htmlFor="price" className="font-medium">Price</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded-md w-full" />

      {/* 🔹 Category Select */}
      <label htmlFor="category" className="font-medium">Category</label>
      <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded-md w-full">
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      {/* 🔹 Seller Select */}
      <label htmlFor="seller" className="font-medium">Seller</label>
      <select name="seller" value={formData.seller} onChange={handleChange} className="border p-2 rounded-md w-full">
        <option value="">Select a seller</option>
        {sellers.map((seller) => (
          <option key={seller._id} value={seller._id}>{seller.name}</option>
        ))}
      </select>

      <div className="flex gap-4 justify-center">
        <button onClick={() => setEditScreen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
      </div>
    </div>
  );
};

export default Edit;
