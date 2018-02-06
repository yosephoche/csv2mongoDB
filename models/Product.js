let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {type: String, Required: 'Product name cannot be empty'},
    price: {type: String},
    category: {type: String},
    description: {type: String},
    manufacturer: {type: String}
});

module.exports = mongoose.model('Products', productSchema);

