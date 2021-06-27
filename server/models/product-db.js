const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    smallPrice: { type: String, required: true },
    mediamPrice: { type: String, required: true },
    largePrice: { type: String, required: true },
    description: { type: String, required: true },
    productImage: { type: String }
});

module.exports = mongoose.model('Product', productSchema);