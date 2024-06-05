import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../Dashboard/Sidebar';
import Header from '../Dashboard/Header';

const ProductList = ({ products, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleEdit = (index) => {
    navigate(`/edit-product/${index}`);
  };

  return (
    <div>
      <Header />
      <div className="product-list-container">
        <Sidebar />
        <div className="product-list-content">
          <h2>Product List</h2>
          <div className="product-grid">
            {products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-card-header">
                  <h3>{product.name}</h3>
                  <div className="product-card-actions">
                    <FaEdit className="action-icon" onClick={() => handleEdit(index)} />
                    <FaTrash className="action-icon" onClick={() => handleDelete(index)} />
                  </div>
                </div>
                <p>Price: ₹{product.basePrice}</p>
                <p>Category: {product.category}</p>
                <p className="description">Description: {product.description}</p>
                {product.images.length > 0 && (
                  <div className="product-image">
                    <img src={URL.createObjectURL(product.images[0])} alt={product.name} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
