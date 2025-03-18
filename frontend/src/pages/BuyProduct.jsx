console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);


import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BuyProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showMore, setShowMore] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/showproducts");
                if (response.data.success) {
                    setProducts(response.data.data);
                    setFilteredProducts(response.data.data);

                    const uniqueCategories = [...new Set(response.data.data.map(p => p.category?.name))];
                    setCategories(uniqueCategories);
                }
            } catch (e) {
                console.error("Error fetching products:", e);
            }
        };

        fetchProducts();
    }, []);

    const handleBuy = async (product) => {
        const order = {
            "userId": "67d54afd442b3f4dcdcfa352",
            "productId": product._id,  // ✅ No need for template literals here
            "quantity": product.quantity
        };
        try {
            const response = await axios.post("http://localhost:3000/api/addtocart", order);
            if (response.data.success) {
                alert("Product added to cart successfully!");
            }
        } catch (error) {
            console.error("Error purchasing product:", error);
        }
    };

    useEffect(() => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category?.name === selectedCategory);
        }

        if (minPrice) {
            filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
        }

        if (searchQuery) {
            filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, minPrice, maxPrice, searchQuery, products]);

    return (
        <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center font-serif font-bold text-2xl mb-6">
                <h1>Buy</h1>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="border px-3 py-2 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="border px-3 py-2 rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    className="border px-3 py-2 rounded"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    className="border px-3 py-2 rounded"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="border px-3 py-2">#</th>
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2 hidden sm:table-cell">Description</th>
                            <th className="border px-3 py-2">Qty</th>
                            <th className="border px-3 py-2">Price</th>
                            <th className="border px-3 py-2 hidden md:table-cell">Seller</th>
                            <th className="border px-3 py-2 hidden lg:table-cell">Category</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={product._id} className="hover:bg-gray-50 odd:bg-gray-100">
                                    <td className="border px-3 py-2 text-center">{index + 1}</td>
                                    <td className="border px-3 py-2">{product.name}</td>
                                    <td className="border px-3 py-2 hidden sm:table-cell">
                                        {product.description.length > 40 ? (
                                            <>
                                                {showMore[product._id]
                                                    ? product.description
                                                    : product.description.slice(0, 40) + "... "}
                                                <button
                                                    onClick={() => setShowMore(prev => ({
                                                        ...prev,
                                                        [product._id]: !prev[product._id]
                                                    }))}
                                                    className="text-[#2196F3] font-bold"
                                                >
                                                    {showMore[product._id] ? "show less" : "show more"}
                                                </button>
                                            </>
                                        ) : (
                                            product.description
                                        )}
                                    </td>
                                    <td className="border px-3 py-2 text-center">{product.quantity}</td>
                                    <td className="border px-3 py-2 text-center">${product.price}</td>
                                    <td className="border px-3 py-2 hidden md:table-cell">{product.seller?.name || "N/A"}</td>
                                    <td className="border px-3 py-2 hidden lg:table-cell">{product.category?.name || "N/A"}</td>
                                    <td className="border-t-2 px-3 py-2 flex gap-2 justify-center">
                                        <button className="text-[#2196F3] font-bold" onClick={() => handleBuy(product)}> Buy</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="border px-4 py-3 text-center text-gray-500">
                                    No Products Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BuyProduct;
