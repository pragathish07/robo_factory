import React from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const categories = [
  { name: 'Electronics', path: '/shop/electronics', image: 'https://etimg.etb2bimg.com/photo/104101941.cms' },
  { name: 'Radios', path: '/shop/radios', image: 'https://images.pexels.com/photos/18449793/pexels-photo-18449793.jpeg?cs=srgb&dl=pexels-berna-elif-359546580-18449793.jpg&fm=jpg' },
  { name: 'Motor and Gearboxes', path: '/shop/motor-and-gearboxes', image: 'https://5.imimg.com/data5/SELLER/Default/2021/9/QE/MJ/EQ/7911475/induction-motor-gearbox.jpg' },
  { name: 'Battery', path: '/shop/battery', image: 'https://m.media-amazon.com/images/I/61clD72Q7BL._SX466_.jpg' },
  { name: 'Charger and Accessories', path: '/shop/charger-accessories', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTjYUKf2MquyVq0jkPXlAmRkqZT4zgaXjRZESXmMg_jqMkQd44h' },
  { name: 'RoboKits', path: '/shop/robokits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTKjPZzEDdfIxNBYc9ScSQ-PPYRPjIXzJ7LE_CT174AfuWdj1' },
  { name: 'Tools', path: '/shop/tools', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrJQpUbLvFp_KiFdOw7-zhhpJ35AGee8kbwdGWQvOHcSdgeWJO' },
  { name: 'Merchandise', path: '/shop/merchandise', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6jD5ItGT2q8-t4hcu8YU3Ki0WgP-R6dnj_Yt0Vo3QFSAeQSm' },
  { name: 'Wires, Cables and Connections', path: '/shop/wires-cables-connections', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkWEqENYOGJ8PzlYtNZcegv_2JDMOCgvO3ZQrk3ZQvq9YRsXJf' },
  { name: 'Mechanical', path: '/shop/mechanical', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_bV55KgTQFhOkT5CzHKkPbuMGe0TuDtag_WqxuNZADYop-GT' },
];

const Shop = () => {
  return (
    <div className="shop">
      <h1>SHOP BY CATEGORIES</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <Link to={category.path} key={index} className="category-card">
            <div
              className="card-content"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className="overlay">
                <h2>{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
