const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const oracledb = require('oracledb');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(upload.single('product-image'));
// app.use('/uploads', express.static('uploads'));

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename to be the current timestamp + original file extension
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle product submissions
app.post('/addProduct', upload.single('product-image'), async (req, res) => {
  try {
    const { productName, productVersion } = req.body;

    // Get the file path of the uploaded image
    const productImage = req.file.path;

    // // Create a database connection
    // const connection = await oracledb.getConnection(dbConfig);

    // // Insert data into the database
    // const result = await connection.execute(
    //   `INSERT INTO products (product_name, product_version, product_image) VALUES (:productName, :productVersion, :productImage)`,
    //   { productName, productVersion, productImage }
    // );

    // // Release the connection
    // await connection.close();

    // Send a success response to the client
    res.status(200).json({ message: `Product added successfully!` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

