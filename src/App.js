import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import { AuthProvider } from './pages/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddToCart from './pages/AddToCart';
import Wishlist from './pages/Wishlist';
import OrdersAndReturns from './pages/OrdersAndReturns';
import Electronics from './pages/Electronics';
import Radios from './pages/Radios';
import MotorsAndGearboxes from './pages/MotorsAndGearboxes';
import Battery from './pages/Battery';
import ChargerAndAccessories from './pages/ChargerAndAccessories';
import RoboKits from './pages/RoboKits';
import Tools from './pages/Tools';
import Merchandise from './pages/Merchandise';
import WiresCablesConnections from './pages/WiresCablesConnections';
import Mechanical from './pages/Mechanical';
import Contact from './pages/Contact';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerSupport from './pages/CustomerSupport';
import Dashboard from './pages/Dashboard';
import AddProduct from './components/Products/AddProduct';
import ProductList from './components/Products/ProductList';
import Orders from './components/Orders/Orders';
import EditProduct from './components/Products/EditProduct'; 

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (productData) => {
    setProducts([...products, productData]);
  };

  const handleUpdateProduct = (index, updatedProduct) => {
    const updatedProducts = products.map((product, idx) =>
      idx === index ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, idx) => idx !== index));
  };
  return (
    <AuthProvider>
      <Router>
        <div id="root">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<AddToCart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="pages/orders" element={<OrdersAndReturns />} />
              <Route path="/customerdashboard" element={<CustomerDashboard />} />
              <Route path="/customer-support" element={<CustomerSupport />} />
              
              <Route path="/shop/electronics" element={<Electronics />} />
              <Route path="/shop/radios" element={<Radios />} />
              <Route path="/shop/motor-and-gearboxes" element={<MotorsAndGearboxes />} />
              <Route path="/shop/battery" element={<Battery />} />
              <Route path="/shop/charger-accessories" element={<ChargerAndAccessories />} />
              <Route path="/shop/robokits" element={<RoboKits />} />
              <Route path="/shop/tools" element={<Tools />} />
              <Route path="/shop/merchandise" element={<Merchandise />} />
              <Route path="/shop/wires-cables-connections" element={<WiresCablesConnections />} />
              <Route path="/shop/mechanical" element={<Mechanical />} />

              <Route path="/" element={<Dashboard products={products} />} />
          <Route path="/add-product" element={<AddProduct onSubmit={handleAddProduct} />} />
          <Route
            path="/product-list"
            element={<ProductList products={products} onDelete={handleDeleteProduct} />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/edit-product/:index"
            element={<EditProduct products={products} onUpdate={handleUpdateProduct} />}
          />

              {/* Add more routes */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
