const express = require('express');
const cors = require('cors');
var session = require('express-session');
const app = express();
app.use(cors( {credentials: true}));
app.use(express.json());
const authMiddleware = require('./routes/authMiddleware');
const crypto = require('crypto');




let globalData = {};

// Middleware to set global data
app.use((req, res, next) => {
    // Modify globalData as needed based on req or session data
    globalData.user = req.session.user; 
    globalData.password = req.session.user

    // Continue to the next middleware or route handler
    next();
});


const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const serialNumberRoutes = require('./routes/serialNumRoutes');
const authRoutes = require('./routes/authRoutes');


/* Make sure your port matches the port that YOU ARE FETCHING WITH!!! */
const PORT = 3000;

// Middlewar

app.use(cors());

app.use(express.json());


// Routes
app.use('/user', userRoutes);
app.use('/sn', productRoutes);
app.use('/product',serialNumberRoutes);
app.use('/auth', authRoutes);

// Starts the server 
// Use command node server.js to use server
app.listen(PORT, (err) => {if (err) {
        console.error(err);
    } else {
        console.log(`Server listening on PORT ${PORT}`);
    }
});

// Generate a session key
function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}
