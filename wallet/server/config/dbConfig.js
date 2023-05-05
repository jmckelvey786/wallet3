const mongoose = require('mongoose');
// console.log(process.env.mongo_url);
const connectdb= mongoose.connect('mongodb://127.0.0.1:27017/wallet');
console.log(connectdb);
const connectionResult = mongoose.connection;

connectionResult.on('error', () => {
    console.log('Error Connecting to database');
});
connectionResult.on('connected', () => {
    console.log('Connected to database');
});

module.exports = connectionResult;