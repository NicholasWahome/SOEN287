const express = require('express');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const serialNumberRoutes = require('./routes/serialNumberRoutes');

const app = express();

/* Make sure your port matches the port that YOU ARE FETCHING WITH!!! */
const PORT = 5502;

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/user', userRoutes); 
app.use('/sn', productRoutes);
app.use('/product', serialNumberRoutes);

// Starts the server 
// Use command node server.js to use server
app.listen(PORT, (err) => {if (err) {
        console.error(err);
    } else {
        console.log(`Server listening on PORT ${PORT}`);
    }
});

