const express = require('express');
const router = express.Router()

// Database Configuration
const oracledb = require('oracledb');
const dbConfig = {
 user: 'admin',
 password: 'Database287//',
 connectString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ca-montreal-1.oraclecloud.com))(connect_data=(service_name=geed4444a402754_getsoftdatabase_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
}

// Assuming successful login
app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const connection = await oracledb.getConnection(dbConfig);
 
    const result = await connection.excecute(`SELECT email, password FROM USERS WHERE email = '${email}' AND password = '${password}'`);
    
    if (result != null) {
            // Store user information in the session
            req.session.user = {
                email: email
            };
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.json({ success: true, message: 'Logout successful' });
        }
    });
});

module.exports = router;