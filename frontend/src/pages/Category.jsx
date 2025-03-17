import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [addScreen, setAddScreen] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/categories");
                if (res.data.success) {
                    setCategories(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();

        const handleCategoryUpdate = () => {
            fetchCategories();
        };

        window.addEventListener("categoryUpdated", handleCategoryUpdate);

        return () => {
            window.removeEventListener("categoryUpdated", handleCategoryUpdate);
        };
    }, []);

    // Handle Add Category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/addcategory", { name: categoryName });
            if (res.data.success) {
                alert("Category added successfully!");
                window.dispatchEvent(new Event("categoryUpdated"));
                setCategoryName("");
                setAddScreen(false);
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    // Handle Delete Category
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`http://localhost:3000/api/deletecategory/${id}`);
                setCategories(categories.filter((cat) => cat._id !== id));
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex justify-between items-center font-serif font-bold text-2xl mb-6">
                <h1>Categories</h1>
                <button
                    className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => setAddScreen(true)}
                >
                    Add Category
                </button>
            </div>

            {/* Category Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="border px-3 py-2">#</th>
                            <th className="border px-3 py-2">Category Name</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr key={category._id} className="hover:bg-gray-50 odd:bg-gray-100">
                                    <td className="border px-3 py-2 text-center">{index + 1}</td>
                                    <td className="border px-3 py-2">{category.name}</td>
                                    <td className="border px-3 py-2 flex justify-center">
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border px-4 py-3 text-center text-gray-500">
                                    No Categories Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Category Modal */}
            {addScreen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
                        <h2 className="text-xl font-semibold text-center mb-4">Add Category</h2>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Category Name"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
                            >
                                Add Category
                            </button>
                        </form>
                        <button
                            onClick={() => setAddScreen(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
