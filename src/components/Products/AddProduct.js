import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../Dashboard/Sidebar';
import axios from 'axios';

const AddProduct = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    features: '',
    basePrice: '',
    stock: '',
    discount: '',
    discountType: '',
    category: '',
    subCategory: '',
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSaveDraft = () => {
    // Logic to save draft
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, imgIndex) => imgIndex !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleAddProduct = async () => {
    try {
      // First upload images
      const formData = new FormData();
      product.images.forEach((image) => {
        formData.append('images', image);
      });

      const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.data.success) {
        const imagePaths = uploadResponse.data.filePaths;

        // Then create the product with image paths
        const newProduct = { ...product, images: imagePaths };
        const productResponse = await axios.post('http://localhost:5000/api/products', newProduct);

        if (productResponse.data.success) {
          console.log('Product added successfully:', productResponse.data.product);

          setProduct({
            name: '',
            description: '',
            features: '',
            basePrice: '',
            stock: '',
            discount: '',
            discountType: '',
            category: '',
            subCategory: '',
            images: []
          });

          // Add the new category to the list if it doesn't already exist
          if (!categories.includes(product.category)) {
            setCategories([...categories, product.category]);
          }
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <div className="add-product-container">
        <Sidebar />
        <div className="main-content">
          <header className="add-product-header">
            <div className="header-left">
              <h1>Add Product</h1>
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
                  />
                </label>
                <label>
                  Description Product
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Features
                  <textarea
                    name="features"
                    value={product.features}
                    onChange={handleInputChange}
                  />
                </label>
              </section>
              <section className="upload-img">
                <h3>Upload Img</h3>
                <div className="img-preview">
                  {product.images.length > 0 ? (
                    product.images.map((img, index) => (
                      <div key={index} className="img-container">
                        <img src={URL.createObjectURL(img)} alt={`Product ${index + 1}`} />
                        <button className="delete-img-btn" onClick={() => handleDeleteImage(index)}>
                          <FaTrash />
                        </button>
                      </div>
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
                  />
                </label>
                <label>
                  Stock
                  <input
                    type="text"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Discount
                  <input
                    type="text"
                    name="discount"
                    value={product.discount}
                    onChange={handleInputChange}
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
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((category, index) => (
                      <option key={index} value={category} />
                    ))}
                  </datalist>
                </label>
                <label>
                  Sub Category
                  <input
                    type="text"
                    name="subCategory"
                    value={product.subCategory}
                    onChange={handleInputChange}
                  />
                </label>
              </section>
            </div>
          </div>
          <div className="add-product-actions">
            <button className="save-draft-btn" onClick={handleSaveDraft}>
              <FaSave /> Save Draft
            </button>
            <button className="add-product-btn" onClick={handleAddProduct}>
              <FaPlus /> Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
