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
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(`
            SELECT email, password FROM USERS 
            WHERE email = :email AND password = :password
        `, { email, password });
        // Check the length of the result rows
        if (result.rows.length > 0) {
            modifyGlobalUsername(email);
            modifyGlobalPassword(password);
            res.json({ success: true, message: 'Login successful'});
        } else {
            // No matching user found
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
}
});
router.post('/logout', async(req, res) => {

});

module.exports = router;