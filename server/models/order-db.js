const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    name: { type: String, required: true },
    pickupordelivery: { type: String, required: true },
    emailAdress: { type: String, required: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    subAddress: { type: String, required: true },
    postalcode: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', productSchema);