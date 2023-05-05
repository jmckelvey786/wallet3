const express = require('express');
const app = express();

app.use(express.json());
const dbConfig = require('./config/dbConfig.js')
const userRoute = require('./routes/userRoute.js');

app.use('/api/users', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`)
});