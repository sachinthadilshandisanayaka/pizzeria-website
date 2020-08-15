const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('./product-db');
const Order = require('./order-db');
const authCheck = require('../middleware/check-auth');

router.get('/', authCheck, (req, res, next)=> {
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
        if(!docs) {
            res.status(404).json({
                message: 'No Orders'
            });
        }
        return res.status(201).json({
            Orders: docs.map(doc => {
                return {
                    oderId: doc._id,
                    ProductId: doc.product,
                    quantity: doc.quantity,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        return res.status(404).send('Unauthorized request')
});
   
});

router.get('/:orderId', authCheck, (req, res, next) =>{ // view one order
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(docs => {
        res.status(201).json({
            OrderId : docs._id,
            ProductId : docs.product,
            Quantity : docs.quantity,
            request : {
                type: 'GET',
                url : 'http://localhost:3000/orders'
            }
        });
    })
    .catch(err => {
        res.status(404).json({
            Error : err
        });
    });
});

router.post('/', authCheck, (req, res, next) => { // buy product
    const productId = req.body.productId;
    Product.findById(productId)
    .exec()
    .then(result => {
        if(!result) {
            res.status(404).json({
                message : 'no product found'
            });
        } 
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product : productId,
            quantity : req.body.quantity
        });
        order
        .save()
        .then(docs => {
            res.status(201).json({
                message: 'Order creates success!!',
                request : {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + docs._id
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                Error : err
            });
        });

    })
    .catch(err => {
        res.status(404).json({
            message : 'Id is wrong',
            Error : err
        });
    });

});


router.patch('/:OrderId', authCheck, (req,res,next) => {
    const id = req.params.OrderId;
    const updateObject = {};
        for (const ob of req.body) {
            updateObject[ob.propName] = ob.value;
        }
    Order.update({_id : id}, { $set: updateObject})
    .exec()
    .then(result => {
        res.status(201).json({
            message : 'Order Updated',
            request : {
                type: 'GET',
                url : 'http://localhost:3000/orders/' + id
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

router.delete('/:OrderId', authCheck,(req,res,next)=>{
    const id = req.params.OrderId;
    Order.remove({ _id: id})
    .exec()
    .then(result =>{
        res.status(201).json({
            message : "delete success",
            request : {
                type: 'GET',
                url : 'http://localhost:3000/orders'
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