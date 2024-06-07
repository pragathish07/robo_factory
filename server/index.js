const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const Product = require('./models/Products');
const multer = require('multer');
const path = require('path');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
// Middleware
app.use(bodyParser.json());

app.use(cors(corsOptions));

// Routes
app.use('/api', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


// MongoDB connection
mongoose.connect('mongodb+srv://iampragathish:vK9mNTIKJilntV8z@cluster0.irx6cnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).array('images', 10); // Accept up to 10 images

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Endpoint for uploading images
app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false, message: err });
    } else {
      if (req.files === undefined) {
        res.status(400).json({ success: false, message: 'No file selected' });
      } else {
        const filePaths = req.files.map(file => file.path);
        res.status(200).json({ success: true, filePaths: filePaths });
      }
    }
  });
});


app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  // Retrieve products from the database based on the category
  Product.find({ category })
    .then((products) => {
      res.status(200).json({ success: true, products });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
});

app.post('/api/products', (req, res) => {
  const productData = req.body;

  // Create a new product using the Product model
  Product.create(productData)
    .then((product) => {
      // Send back a success response with the created product
      res.status(201).json({ success: true, product });
      console.log('Product added successfully');
    })
    .catch((err) => {
      // Send back an error response if something went wrong
      res.status(500).json({ success: false, error: err.message });
    });
});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello from Express!');
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
