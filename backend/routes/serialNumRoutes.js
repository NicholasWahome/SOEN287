const express = require('express');
const router = express.Router()

// Database Configuration
const oracledb = require('oracledb');
const dbConfig = {
  user: 'admin',
  password: 'Database287//',
  connectString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ca-montreal-1.oraclecloud.com))(connect_data=(service_name=geed4444a402754_getsoftdatabase_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
 }
 const { getGlobalData, setGlobalData, modifyGlobalUsername, modifyGlobalPassword } = require('./globals');



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
  

  async function saveSerialNumbersToDB(serialNumbers) {
      let connection;
    
      try {
        connection = await oracledb.getConnection(dbConfig);
    

        for (const serialNumber of serialNumbers) {
          const query = `
            INSERT INTO SerialNumbers (serial_number, expiry_date)
            VALUES (:serial_number, TO_DATE(:expiry_date, 'YYYY-MM-DD'))
          `;
    

          const binds = {
            serial_number: serialNumber.serialNumber,
            expiry_date: serialNumber.expiryDate,
          };
    

          const result = await connection.execute(query, binds, { autoCommit: true });
          console.log(`Serial number ${serialNumber.serialNumber} inserted into the database.`);
        }
      } catch (error) {
        console.error('Error saving serial numbers to the database:', error);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (error) {
            console.error('Error closing the database connection:', error);
          }
        }
      }
    }
router.get('/listSN', async(req,res) =>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    let { username, password } = getGlobalData();
    const result = await connection.execute(
        `SELECT name, lastName, email, address, productName, productVersion, serialNum, expiryDate, Status 
          FROM purchasedproducts WHERE email = :email`,
        { email: username },
    );

    connection.close();
    console.log(result.rows[0]);

    res.status(200).json({
        data: result.rows[0]
    });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.get('listSNP', async(req,res) =>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    let { username, password } = getGlobalData();
    const result = await connection.execute(
        `SELECT name, lastName, email, address, productName, productVersion, serialNum, expiryDate, Status 
          FROM purchasedproducts WHERE email = :email`,
        { email: username },
    );

    connection.close();
    console.log(result.rows[0]);

    // Sending only the values to the client
    res.status(200).json({
        data: result.rows[0]
    });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.post('/addingSN', async(req,res) =>{
  try {
    const connection = await oracledb.getConnection(dbConfig);
    let { username, password } = getGlobalData();
    const {productName,productVersion,serialNum } = req.body;

    purchaseData = {
      name :'john.doe@example.com',
      lastName:'john.doe@example.com',
      email: username,
      address:'123 Main St',
      productName:productName,
      productVersion:productVersion,
      serialNum:serialNum,
      expiryDate:'2023-06-30',
      status:'available'
    }
    const result1 = await connection.execute(
      `INSERT INTO REGISTEREDPRODUCTS(serialNum,expiryDate )
      VALUES(:serialNum, :expiryDate)`,
      {serialNum: purchaseData.serialNum,expiryDate :purchaseData.expiryDate},
      { autoCommit: true } 
  );
  const result2 = await connection.execute(
    `INSERT INTO PRODUCTS (productName, productVersion, pathImage)
     VALUES (:productName, :productVersion, :pathImage)`,
    {
        productName: purchaseData.productName,
        productVersion: purchaseData.productVersion,
        pathImage: '/images/default.jpg' 
    },
    { autoCommit: true } 
    );
    const result3 = await connection.execute(
      `INSERT INTO PurchasedProducts 
       (name, lastName, email, address, productName, productVersion, serialNum, expiryDate, status)
       VALUES (:name, :lastName, :email, :address, :productName, :productVersion, :serialNum, :expiryDate, :status)`,
      purchaseData,
      { autoCommit: true } 
  );
    connection.close();
    res.status(200).json({ success: true, message: `Product Added!` });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

  
module.exports = router;