import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import OrdersAndReturns from './pages/OrdersAndReturns';
import Electronics from './pages/Electronics';
import Radios from './pages/Radios';
import Motors from './pages/Motors';
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
import ProductDetail from './pages/ProductDetail';
import AddToCart from './pages/Cart';
import { UserContext, UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import OrderConfirmation from './pages/OrderConfirmation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnsAndRefunds from './pages/ReturnsAndRefunds';
import TermsAndConditions from './pages/TermsOfService';
import AddAdmin from './pages/AddAdmin';
import CategoriesPage from './components/Products/AdminCategories';
import ProductGrid from './components/Products/ProductGrid';
import ReturnConfirmation from './pages/returnConfirmation';

const App = () => {



  return (

    <AuthProvider>
      <UserProvider>
        <CartProvider>

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
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path='/admin/add-admin'
                    element={
                      <AdminRoute>
                        <AddAdmin />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/shop/electronics"
                    element={

                      <Electronics />

                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProtectedRoute>
                        <ProductDetail />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/shop/radios"
                    element={

                      <Radios />

                    }
                  />

                  <Route
                    path="/shop/motors"
                    element={

                      <Motors />

                    }
                  />

                  <Route
                    path="/shop/battery"
                    element={

                      <Battery />

                    }
                  />

                  <Route
                    path="/shop/charger-accessories"
                    element={

                      <ChargerAndAccessories />

                    }
                  />

                  <Route
                    path="/shop/robokits"
                    element={

                      <RoboKits />

                    }
                  />

                  <Route
                    path="/shop/tools"
                    element={

                      <Tools />

                    }
                  />

                  <Route
                    path="/shop/merchandise"
                    element={

                      <Merchandise />

                    }
                  />

                  <Route
                    path="/shop/wires-cables-connections"
                    element={

                      <WiresCablesConnections />

                    }
                  />

                  <Route
                    path="/shop/mechanical"
                    element={

                      <Mechanical />

                    }
                  />
                  <Route
                    path='/return'
                    element={
                      <ProtectedRoute>
                        <ReturnConfirmation/>
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path='/privacy-policy'
                    element={
                      <ProtectedRoute>
                        <PrivacyPolicy />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path='terms-of-service'
                    element={
                      <ProtectedRoute>
                        <TermsAndConditions />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path='/returns-and-refunds'
                    element={
                      <ProtectedRoute>
                        <ReturnsAndRefunds />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/add-product"
                    element={
                      <ProtectedRoute>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/product-categories"
                    element={
                      <ProtectedRoute>
                        <CategoriesPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/product-list"
                    element={
                      <ProtectedRoute>
                        <ProductList />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/products/:id"
                    element={
                      <ProtectedRoute>
                        <ProductGrid />
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
                    path='/order-confirmation'
                    element={
                      <ProtectedRoute>
                        <OrderConfirmation />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/edit-product/:id"
                    element={
                      <ProtectedRoute>
                        <EditProduct />
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
        </CartProvider>
      </UserProvider>

    </AuthProvider>


  );
};

export default App;