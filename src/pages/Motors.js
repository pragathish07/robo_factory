import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loader from "react-js-loader";

const Motors = () => {
  const [products, setProducts] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');
  const [filteringOption, setFilteringOption] = useState('Motors');
  const [loading, setLoading] = useState(true);
  const [subcategoryFilter, setSubcategoryFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [filteringOption, subcategoryFilter]); // Include subcategoryFilter in useEffect dependency array

  const fetchProducts = () => {
    axios
      .get(`http://localhost:5000/api/products/category/${filteringOption}`)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      switch (sortingOption) {
        case 'price-low-high':
          return (a.basePrice || 0) - (b.basePrice || 0);
        case 'price-high-low':
          return (b.basePrice || 0) - (a.basePrice || 0);
        case 'rating-high-low':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  };

  const filteredAndSortedProducts = sortProducts(products).filter((product) => {
    if (filteringOption === 'all') {
      return true;
    } else {
      return product.category === filteringOption &&
        (subcategoryFilter === '' || product.subCategory === subcategoryFilter);
    }
  });

  const handleSubcategoryFilterChange = (e) => {
    setSubcategoryFilter(e.target.value);
  };

  return (
    <div className="Motors">
      <h2>Motors</h2>
      <div className="options-container">
        <div className="sorting-options">
          <label htmlFor="sortSelect">Sort By:</label>
          <select
            id="sortSelect"
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating-high-low">Rating: High to Low</option>
            <option value="rating-low-high">Rating: Low to High</option>
          </select>
        </div>
        <div className="filter-options">
          <label htmlFor="filterSelect">Filter By:</label>
          <select
            id="filterSelect"
            onChange={(e) => setFilteringOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Motors">Motors</option>
            {/* Add more filtering options as needed */}
          </select>
        </div>
        <div className="subcategory-filter">
          <label htmlFor="subcategoryFilter">Subcategory:</label>
          <select
            id="subcategoryFilter"
            onChange={handleSubcategoryFilterChange}
            value={subcategoryFilter}
          >
            <option value="">All</option>
            <option value="5kg">5kg</option>
            <option value="10kg">10kg</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loader type="box-rectangular" bgColor={"grey"} color={"grey"} title={"Please wait"} size={100} />
      ) : (
        <div className="product-list">
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Motors;
