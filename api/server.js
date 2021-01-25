const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const config=require('./app/config');

const users = require('./app/users');
const products=require('./app/products');
const categories=require('./app/categories');



const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));


const run = async () => {
    await mongoose.connect(config.db.url+'/'+config.db.name);

    app.use('/users', users());
    app.use('/products', products());
    app.use('/categories',categories());

    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    });
    console.log('mongo connected!');
};

run().catch(console.log);


