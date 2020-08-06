const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./user-db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'server works'
    });
})

router.post('/signup', (req, res, next) => {

    User
    .find({email: req.body.email})
    .exec()
    .then(docs =>{
        if (docs.length >= 1) {
            res.status(200).json({
                message: 'Email is already used'
            });
        } else {
            
                bcrypt.hash(req.body.password, 10, (err, hash)=> {
                    if (err) {
                        return res.status(500).json({
                            Error : err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.username,
                            email: req.body.email,
                            password: hash
                        });
                        user
                        .save()
                        .then(result =>{
                            console.log(result);
                            res.status(200).json({
                                message: 'Sing Up successfull'
                            });
                        })
                        .catch(error => {
                            console.log(error),
                            res.status(404).json({
                                Error: error
                            })
                            
                        });
                    }
                });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/signin', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(result => {
        if (result.length < 1) {
            res.status(200).json({
                message : 'Email is incorrect!'
            });
        }
        bcrypt.compare(req.body.password, result[0].password, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    error: err
                });
            }
            if (data) {
                const token = jwt.sign(
                {
                    email: result[0].email,
                    userid: result[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Loging successfully',
                    token: token
                });
            }
            console.log(err);
            return res.status(200).json({
                message: 'password is incorrect'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id})
    .exec()
    .then(result =>{
        res.status(201).json({
            message: 'User account deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            Error: err
        });
    });
});

module.exports = router;