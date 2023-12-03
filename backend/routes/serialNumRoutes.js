const express = require('express');
const router = express.Router()

// Database Configuration
const oracledb = require('oracledb');
const dbConfig = {
  user: 'admin',
  password: 'Database287//',
  connectString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ca-montreal-1.oraclecloud.com))(connect_data=(service_name=geed4444a402754_getsoftdatabase_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
 }


// Create a serial number - route
router.post('/submit-form', async (req, res) => {
    try {
      // Extract form data from the request
      const { exp, amnt } = req.body;
  
      // Generate random serial numbers
      const serialNumbers = generateRandomSerialNumbers(parseInt(amnt), exp);
  
      // Save serial numbers to the database
      // await saveSerialNumbersToDB(serialNumbers);
  
      // Send a response to the client
      res.json({ success: true, message: 'Serial numbers generated and saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  router.post('/editSN', async(req,res)=> {

  });
  

  // Function to generate random serial numbers
  function generateRandomSerialNumbers(amount, expiryDate) {
    return Array.from({ length: amount }, (_, index) => ({
      serialNumber: generateRandomSerialNumber(),
      expiryDate: expiryDate,
    }));
  }
  
  // Function to generate a random serial number
  function generateRandomSerialNumber(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let serialNumber = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      serialNumber += characters.charAt(randomIndex);
    }
  
    return serialNumber;
  }
  
  // Save serial numbers to the database
  async function saveSerialNumbersToDB(serialNumbers) {
      let connection;
    
      try {
        // Establish a connection to the Oracle database
        connection = await oracledb.getConnection(dbConfig);
    
        // Iterate through the serial numbers and insert them into the database
        for (const serialNumber of serialNumbers) {
          const query = `
            INSERT INTO SerialNumbers (serial_number, expiry_date)
            VALUES (:serial_number, TO_DATE(:expiry_date, 'YYYY-MM-DD'))
          `;
    
          // Bind variables
          const binds = {
            serial_number: serialNumber.serialNumber,
            expiry_date: serialNumber.expiryDate,
          };
    
          // Execute the query
          const result = await connection.execute(query, binds, { autoCommit: true });
          console.log(`Serial number ${serialNumber.serialNumber} inserted into the database.`);
        }
      } catch (error) {
        console.error('Error saving serial numbers to the database:', error);
      } finally {
        // Close the connection when done
        if (connection) {
          try {
            await connection.close();
          } catch (error) {
            console.error('Error closing the database connection:', error);
          }
        }
      }
    }

module.exports = router;