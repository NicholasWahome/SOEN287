const express = require('express');
const router = express.Router()
const multer = require('multer');

// Database Configuration
const oracledb = require('oracledb');
const dbConfig = {
  user: 'admin',
  password: 'Database287//',
  connectString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ca-montreal-1.oraclecloud.com))(connect_data=(service_name=geed4444a402754_getsoftdatabase_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
 }

 const { getGlobalData, setGlobalData, modifyGlobalUsername, modifyGlobalPassword } = require('./globals');
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
  router.post('/addProduct', upload.single('product-image'), async (req, res) => {
    try {
      const { productName, productVersion } = req.body;
  
      // Get the file path of the uploaded image
      const productImage = req.file.path;
  
      // Create a database connection
      const connection = await oracledb.getConnection(dbConfig);
  
      // Insert data into the database
      const result = await connection.execute(
        `INSERT INTO products (productName, productVersion, productImage) VALUES (:productName, :productVersion, :productImage)`,
        { productName, productVersion, productImage }
      );
  
      // Release the connection
      await connection.close();
  
      // Send a success response to the client
      res.status(200).json({ message: `Product added successfully!` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  module.exports = router;
  