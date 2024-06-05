import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddProduct.css'; // Use the same CSS as AddProduct to maintain consistent styling
import Sidebar from '../Dashboard/Sidebar';
import Header from '../Dashboard/Header';
import { FaSave, FaPlus } from 'react-icons/fa';

const EditProduct = ({ products, onUpdate }) => {
  const { index } = useParams();
  const [product, setProduct] = useState(products[index]);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(products[index]);
  }, [index, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddImage = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setProduct({ ...product, images: [...product.images, ...newImages] });
  };

  const handleSaveChanges = () => {
    onUpdate(index, updatedProduct => ({ ...updatedProduct, ...product }));
    navigate('/product-list');
  };
  return (
    <div>
      <Header />
      <div className="add-product-container">
        <Sidebar />
        <div className="main-content">
          <header className="add-product-header">
            <div className="header-left">
              <h1>Edit Product</h1>
            </div>
          </header>
          <div className="add-product-content">
            <div className="info-and-upload">
              <section className="general-info">
                <h3>General Information</h3>
                <label>
                  Name Product
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                  />
                </label>
                <label>
                  Description Product
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                  />
                </label>
                <label>
                  Features
                  <textarea
                    name="features"
                    value={product.features}
                    onChange={handleInputChange}
                    placeholder="List the key features of the product"
                  />
                </label>
              </section>
              <section className="upload-img">
                <h3>Upload Img</h3>
                <div className="img-preview">
                  {product.images.length > 0 ? (
                    product.images.map((img, index) => (
                      <img key={index} src={URL.createObjectURL(img)} alt={`Product ${index + 1}`} />
                    ))
                  ) : (
                    <img src="https://via.placeholder.com/150" alt="Product" />
                  )}
                </div>
                <div className="img-thumbnails">
                  {product.images.map((img, index) => (
                    <img key={index} src={URL.createObjectURL(img)} alt={`Thumbnail ${index + 1}`} />
                  ))}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleAddImage}
                    style={{ display: 'none' }}
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="add-img-btn">
                    <FaPlus />
                  </label>
                </div>
              </section>
            </div>
            <div className="price-and-category">
              <section className="pricing-stock">
                <h3>Pricing And Stock</h3>
                <label>
                  Base Pricing
                  <input
                    type="text"
                    name="basePrice"
                    value={product.basePrice}
                    onChange={handleInputChange}
                    placeholder="Rs.100"
                  />
                </label>
                <label>
                  Stock
                  <input
                    type="text"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    placeholder="100"
                  />
                </label>
                <label>
                  Discount
                  <input
                    type="text"
                    name="discount"
                    value={product.discount}
                    onChange={handleInputChange}
                    placeholder="10%"
                  />
                </label>
                <label>
                  Discount Type
                  <select
                    name="discountType"
                    value={product.discountType}
                    onChange={handleInputChange}
                  >
                    <option value="Seasonal Discount">Seasonal Discount</option>
                    {/* Add more discount types as needed */}
                  </select>
                </label>
              </section>
              <section className="category">
                <h3>Category</h3>
                <label>
                  Product Category
                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                  />
                </label>
                <label>
                  Sub Category
                  <input
                    type="text"
                    name="subCategory"
                    value={product.subCategory}
                    onChange={handleInputChange}
                    placeholder="Sub Category"
                  />
                </label>
              </section>
            </div>
          </div>
          <div className="add-product-actions">
            <button className="save-draft-btn" onClick={() => navigate('/product-list')}>
              Cancel
            </button>
            <button className="add-product-btn" onClick={handleSaveChanges}>
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;