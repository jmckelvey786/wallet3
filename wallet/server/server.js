const express = require('express');
const app = express();
// const env = require("dotenv").config()


app.use(express.json());
const dbConfig = require('./config/dbConfig.js')
const userRoute = require('./routes/userRoute.js');
const transactionsRoute = require('./routes/transactionsRoute.js');

app.use('/api/users', userRoute);
app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`)
});