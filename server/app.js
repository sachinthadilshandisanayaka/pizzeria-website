const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// mongoose.connect('mongodb://localhost:27017/project01', {
//     useNewUrlParser: true, useUnifiedTopology: true
// });
// ,
mongoose.connect("mongodb+srv://node-app:node-app@cluster0.vtg9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
    });
mongoose.Promise = global.Promise;

const productRouter = require('./api/routes/products');
const oderRouter = require('./api/routes/orders');
const userRouter = require('./api/routes/user');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizaion');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
        return Response.status(200).json({});
    }
    next();
});

app.use('/products', productRouter);
app.use('/orders', oderRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;