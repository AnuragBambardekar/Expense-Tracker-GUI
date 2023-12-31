const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')
const cors = require('cors');

const path = require('path');


dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./routes/transactions')

const app = express()
app.use(express.json()); // allow us to use the body-parser
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // to see the methods, URL, response status and the time it takes
}

// app.get('/', (req,res) => res.send('Hello'));
app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV == "production") {
    app.use(express.static('client/build')); // static folder
    // load index.html file in build folder
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client','build','index.html')))
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

