import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [initialImages, setInitialImages] = useState([]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data.product);
        setInitialImages(response.data.product.images);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, imgIndex) => imgIndex !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleEditProduct = async () => {
    try {
      // First upload new images
      const formData = new FormData();
      product.images.forEach((image) => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });

      let imagePaths = initialImages;

      if (formData.has('images')) {
        const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (uploadResponse.data.success) {
          imagePaths = [...initialImages, ...uploadResponse.data.filePaths];
        }
      }

      // Then update the product with image paths
      const updatedProduct = { ...product, images: imagePaths };
      const productResponse = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);

      if (productResponse.data.success) {
        console.log('Product updated successfully:', productResponse.data.product);
        navigate('/product-list')
     
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <div className="edit-product-container">
        <Sidebar />
        <div className="main-content">
          <header className="edit-product-header">
            <div className="header-left">
              <h1>Edit Product</h1>
            </div>
          </header>
          <div className="edit-product-content">
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
                  {initialImages.length > 0 ? (
                    initialImages.map((img, index) => (
                      <div key={index} className="img-container">
                        <img src={`http://localhost:5000/${img}`} alt={`Product ${index + 1}`} />
                      </div>
                    ))
                  ) : (
                    <img src="https://via.placeholder.com/" alt="Product" />
                  )}
                  {product.images.length > 0 && product.images.map((img, index) => (
                    <div key={index} className="img-container">
                      {img instanceof File ? (
                        <img src={URL.createObjectURL(img)} alt={`Product ${index + 1}`} />
                      ) : (
                        <img src={`http://localhost:5000/${img}`} alt={`Product ${index + 1}`} />
                      )}
                      <button className="delete-img-btn" onClick={() => handleDeleteImage(index)}>
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="img-thumbnails">
                  {product.images.map((img, index) => (
                    img instanceof File ? (
                      <img key={index} src={URL.createObjectURL(img)} alt={`Thumbnail ${index + 1}`} />
                    ) : (
                      <img key={index} src={`http://localhost:5000/${img}`} alt={`Thumbnail ${index + 1}`} />
                    )
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
          <div className="edit-product-actions">
           
            <button className="edit-product-btn" onClick={handleEditProduct}>
              <FaPlus /> Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
