const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    price : { type: Number, required: true},
    productImage : { type: String}
});

module.exports = mongoose.model('Product', productSchema);