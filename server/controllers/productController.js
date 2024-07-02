const Product = require('../models/Products');
const Order = require('../models/Orders');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Create a new product
exports.createProduct = (req, res) => {
  const newProduct = new Product(req.body);

  newProduct.save()
    .then(product => res.status(201).json({ success: true, product }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
};


// Get all products

exports.getAllProducts = (req, res) => { 
    Product.find()
        .then(products => {
            res.status(200).json({ success: true, products });
        })  
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
};

exports.getCategory =  async (req, res) => {
  
  try {
    const categories = await Product.distinct('category');
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, product , reviews: product.reviews });
      console.log(product)
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
};

// Get products by category
exports.getProductsByCategory = (req, res) => {
  const { id } = req.params;
  console.log('Category:', id);

  Product.find({ category: id })
    .then(products => {
      if (!products.length) {
        return res.status(404).json({ success: false, message: 'No products found for this category' });
      }
      res.status(200).json({ success: true, products });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
};

// Update a product by ID

exports.updateProductById = (req, res) => {
  // Multer configuration for file storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save the images
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage }).single('image');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    const { id } = req.params;
    
    const updatedData = req.body;

    // If an image is uploaded, add its path to the updatedData
    if (req.file) {
      updatedData.image = req.file.path;
    }

    try {
      const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// Delete a product by ID
exports.deleteProductById = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
};

exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const newReview = {
      user,
      rating,
      comment,
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};
  exports.getProductWithReviews = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user ? req.user._id : null;
  
      const product = await Product.findById(id).populate('reviews.user');
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      let hasPurchased = false;
      if (userId) {
        const userOrders = await Order.find({ user: userId });
        hasPurchased = userOrders.some(order =>
          order.products.some(p => p.product.toString() === id)
        );
      }
  
      res.status(200).json({ success: true, product, hasPurchased });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


exports.checkUserPurchase = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const userOrders = await Order.find({ user: userId, 'items.product': productId });
    if (userOrders.length > 0) {
      return res.status(200).json({ success: true, hasPurchased: true });
    } else {
      return res.status(200).json({ success: true, hasPurchased: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRandomProducts =  async (req, res) => {
  try {
    const products = await Product.find().limit(4);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('orders');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const purchasedProducts = [];

    for (let order of user.orders) {
      const orderDetails = await Order.findById(order._id).populate('items.product');
      orderDetails.items.forEach(productItem => {
        purchasedProducts.push(productItem.product);
      });
    }

    res.status(200).json({ success: true, purchasedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};