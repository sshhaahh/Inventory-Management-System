import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Edit from '../components/Edit';
import Add from '../components/Add';
import { FaSort } from "react-icons/fa";

const Products = ({url}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editScreen, setEditScreen] = useState(false);
  const [addScreen, setAddScreen] = useState(false);
  const [forEdit, setForEdit] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
      const [showMore, setShowMore] = useState({});
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/showproducts`);
        if (response.data.success) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }

        const categoryRes = await axios.get(`${url}/categories`);
        if (categoryRes.data.success) {
          setCategories(categoryRes.data.data);
        }
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    };

    fetchProducts();

    const handleProductUpdate = () => fetchProducts();

    window.addEventListener("productUpdated", handleProductUpdate);

    return () => {
      window.removeEventListener("productUpdated", handleProductUpdate);
    };
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectCategory !== "all") {
      filtered = filtered.filter(product =>
        product.category?.name.toLowerCase() === selectCategory
      );
    }

    if (sortOrder) {
      filtered.sort((a, b) =>
        sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }

    setFilteredProducts(filtered);
  }, [search, products, selectCategory, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const handleEdit = (product) => {
    setForEdit(product);
    setEditScreen(true);
  };

  const handleCategoryChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${url}/deleteproduct/${id}`);
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className='flex justify-between items-center font-serif font-bold text-2xl mb-6'>
        <h1>Products</h1>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
          onClick={() => setAddScreen(true)}
        >
          Add Product
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="border p-2 rounded-md w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">
                <button onClick={toggleSortOrder} className='flex justify-center items-center gap-3'>
                  Name <FaSort />
                </button>
              </th>
              <th className="border px-3 py-2 hidden sm:table-cell">Description</th>
              <th className="border px-3 py-2">Qty</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2 hidden md:table-cell">Seller</th>
              <th className="border px-3 py-2 hidden lg:table-cell">
                <select name="category" id="category" onChange={handleCategoryChange} value={selectCategory}>
                  <option value="all">All</option>
                  {categories.map((cate) => (
                    <option key={cate._id} value={cate.name.toLowerCase()}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              </th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product._id} className={`${product.quantity < 10 ? "bg-red-300" : "hover:bg-gray-50 odd:bg-gray-100"}`}>
                  <td className="border px-3 py-2 text-center">{index + 1}</td>
                  <td className="border px-3 py-2">{product.name}</td>
                  <td className="border px-3 py-2 hidden sm:table-cell ">{product.description.length > 40 ? (
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
                                        )}</td>
                  <td className="border px-3 py-2 text-center">{product.quantity}</td>
                  <td className="border px-3 py-2 text-center">${product.price}</td>
                  <td className="border px-3 py-2 hidden md:table-cell">{product.seller?.name || 'N/A'}</td>
                  <td className="border px-3 py-2 hidden lg:table-cell">{product.category?.name || 'N/A'}</td>
                  <td className="border px-3 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border px-4 py-3 text-center text-gray-500">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {addScreen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
            <Add setAddScreen={setAddScreen} />
          </div>
        </div>
      )}

      {editScreen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
            <Edit forEdit={forEdit} setEditScreen={setEditScreen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
