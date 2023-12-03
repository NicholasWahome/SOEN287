const express = require('express');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const serialNumberRoutes = require('./routes/serialNumRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./routes/authMiddleware')
const session = require('express-session')
const app = express();

/* Make sure your port matches the port that YOU ARE FETCHING WITH!!! */
const PORT = 3000;

// Middleware
app.use(cors( {credentials: true}));

app.use(express.json());

const crypto = require('crypto');

const secretKey = generateRandomString(32);


app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/user',authMiddleware, userRoutes);
app.use('/sn', authMiddleware, productRoutes);
app.use('/product', authMiddleware, serialNumberRoutes);
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
