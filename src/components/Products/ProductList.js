import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../Dashboard/Sidebar';
import axios from 'axios';
import Shop from '../Shop';

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filtering
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      if (response.data.success) {
        setProducts(products.filter(product => product._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery)) &&
    (categoryFilter === '' || product.category === categoryFilter) // Apply category filter
  );

  return (
    <div className="product-list-container">
      <Sidebar />
      <div className="product-list-content">
        <div className="header">
          <h2>Product List</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
        </div>
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-card-header">
                <h3>{product.name}</h3>
                <div className="product-card-actions">
                  <FaEdit className="action-icon" onClick={() => handleEdit(product._id)} />
                  <FaTrash className="action-icon" onClick={() => handleDelete(product._id)} />
                </div>
              </div>
              <p>Price: ₹{product.basePrice}</p>
              <p>Category: {product.category}</p>
              {product.images.length > 0 && (
                <div className="product-image">
                  <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default ProductList;
