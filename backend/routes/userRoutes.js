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


router.post('/signup', async (req, res) => {
    try {
        const { name, last_name, email, password, address, account_type } = req.body;

        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `INSERT INTO users (name, lastName, email, password, address, userType) VALUES (:name, :last_name, :email, :password, :address, :account_type)`,
            [name, last_name, email, password, address, account_type],
            { autoCommit: true }
        );

        connection.close();

        res.status(200).json({ success: true, message: `Account created successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Edit User Password
router.post('/editPassword', async (req, res) => {
    try {
        const { name, last_name, email, password, address, account_type } = req.body;

        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `UPDATE users SET password = :password WHERE email = :email`,
            { email, password },
            { autoCommit: true }
        );    

        connection.close();

        res.status(200).json({ success: true, message: `Account created successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }

});

//Edit all the details for the user
router.post('/editaccountinfo', async (req, res) => {
    try {
        const { name, last_name, password, address, account_type } = req.body;
        email=getGlobalData();
        let {username, Password} = getGlobalData();
        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `UPDATE SET users (name, lastName, email, password, address, userType) VALUES (:name, :last_name, :email, :password, :address, :account_type)`,
            [name, last_name, email, password, address, account_type],
            {email:username},
            { autoCommit: true }
        );    

        connection.close();

        res.status(200).json({ success: true, message: `Account updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'failed' });
    }

});

router.get('/getinfo', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        let {username, password} = getGlobalData();

        // Replace this query with the actual query you need
        const result = await connection.execute(
            'SELECT name, lastname, email, address, usertype FROM users WHERE email = :email',
            { email: username }
        );

        console.log(result);
        connection.close();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });

// Get User Information
router.get('/getUserDashboard', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        let {username, password} = getGlobalData();

        
        const result = await connection.execute(
            'SELECT name, email, address FROM users WHERE email = :email',
            { email: username }
        );
        connection.close();
        res.status(200).json({data: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;