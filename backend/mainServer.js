require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Import routes
const customerRoutes = require('./routes/customersRoutes');
const kitchenRoutes = require('./routes/kitchensRoutes');

// Middleware 
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {  
    console.log(req.path, req.method)
    next()
})
 
// Routes
app.use('/kitchen', kitchenRoutes);
  
app.use('/customer', customerRoutes);    
 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => { 
    console.log("MongoDB connected")

    // PORT 5000 
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
})
    .catch(err => console.log(err));  


