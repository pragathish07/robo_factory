import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
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
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from './ProtectedRoutes';
import AdminRoute from './AdminRoute';

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
            <Route path="/customer-support" element={<CustomerSupport />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shop/electronics" 
              element={
                <ProtectedRoute>
                  <Electronics />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/radios" 
              element={
                <ProtectedRoute>
                  <Radios />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/motor-and-gearboxes" 
              element={
                <ProtectedRoute>
                  <MotorsAndGearboxes />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/battery" 
              element={
                <ProtectedRoute>
                  <Battery />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/charger-accessories" 
              element={
                <ProtectedRoute>
                  <ChargerAndAccessories />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/robokits" 
              element={
                <ProtectedRoute>
                  <RoboKits />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/tools" 
              element={
                <ProtectedRoute>
                  <Tools />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/merchandise" 
              element={
                <ProtectedRoute>
                  <Merchandise />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/wires-cables-connections" 
              element={
                <ProtectedRoute>
                  <WiresCablesConnections />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/shop/mechanical" 
              element={
                <ProtectedRoute>
                  <Mechanical />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/add-product" 
              element={
                <ProtectedRoute>
                  <AddProduct onSubmit={handleAddProduct} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/product-list" 
              element={
                <ProtectedRoute>
                  <ProductList products={products} onDelete={handleDeleteProduct} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/edit-product/:index" 
              element={
                <ProtectedRoute>
                  <EditProduct products={products} onUpdate={handleUpdateProduct} />
                </ProtectedRoute>
              } 
            />

            <Route path="/cart" 
                  element={
                    <ProtectedRoute>
                      <AddToCart />
                    </ProtectedRoute>
              } />

            <Route path="/wishlist" 
                   element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
              } />
            <Route path="pages/orders"
                   element={
                    <ProtectedRoute>
                      <OrdersAndReturns />
                    </ProtectedRoute>
                   
                   } />
            <Route path="/customerdashboard"
                   element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  
                   } />
            

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