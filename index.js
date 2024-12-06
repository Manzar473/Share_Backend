const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users.js')
const productRoutes = require('./routes/product.js')
const requestRoutes = require('./routes/request.js')
const app = express()
require('dotenv').config()
connectDB();

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/requests', requestRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`);
})