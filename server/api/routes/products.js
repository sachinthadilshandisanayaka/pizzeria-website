const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('./product-db');
const multer = require('multer');
const authCheck = require('../middleware/check-auth');
const env = require('dotenv')
env.config();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toDateString() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer ({
    storage: storage,
    limits: {
     fileSize: 1024*1024*5
   }, fileFilter : fileFilter
});


router.get('/', (req, res, next) =>{
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then( result => {
        const dataArray = {
            DataCount : result.length,
            products  : result.map(doc => {
               // console.log(process.env.JWT_KEY);
                return {
                    name : doc.name,
                    price : doc.price,
                    productImage: 'http://localhost:3000/' + doc.productImage,
                    _id : doc._id,
                    request : {
                        type: 'GET',
                        url : 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        
        res.status(201).json(dataArray);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.post("/", authCheck, upload.single('productImage'), (req, res, next) => {
    
    console.log(req.file);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.pname,
        price : req.body.pprice,
        productImage: req.file.path
    }); 
    product
    .save()
    .then(result => {
        console.log(result),
        res.status(201).json({
            message : 'Create product successed',
            products : {
                name : result.name,
                price : result.price,
                _id: result._id,
                request: {
                    type : 'GET',
                    url : 'http://localhost:3000/products/' + result._id
                }
            }
        })
    })
    .catch(err => {
        res.status(201).json({
            error : 'error is hear'
        });
        console.log(err);
    });
   
 });
 router.get('/:productId', (req,res,next) => {
    const pId = req.params.productId;
    Product.findById(pId)
    .select('name price _id productImage')
    .exec()
    .then(result =>{
        res.status(201).json({
            product : result,
            request : {
                type: 'GET',
                url : 'http://localhost:3000/products'
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({
            error : 'Not found data'
        });
    });
 });

 router.patch('/:pId', authCheck, (req,res,next) => {
    const id = req.params.pId;
    const updateObject = {};
        for (const ob of req.body) {
            updateObject[ob.propName] = ob.value;
        }
    Product.update({_id : id}, { $set: updateObject})
    .exec()
    .then(result => {
        res.status(201).json({
            message : 'product Updated',
            request : {
                type: 'GET',
                url : 'http://localhost:3000/products/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });

 });

 router.delete('/:pId', authCheck,(req,res,next)=>{
    const id = req.params.pId;
    Product.remove({ _id: id})
    .exec()
    .then(result =>{
        res.status(201).json({
            message : "delete success",
            request : {
                type: 'GET',
                url : 'http://localhost:3000/products'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
 });

module.exports = router;
