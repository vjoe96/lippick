const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    color: {
        type: String,
    },
    category: {
        type: String,
    },
    tone: {
        type: String,
    }
    
}, { timestamps: true })

productSchema.index({
    category:"text",
    title:"text",
    tone:"text"
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }