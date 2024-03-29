const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    colors: [{
        type: String,
        required: true
    }],
    phoneModels: [{
        type: String,
        required: true
    }],
    // Add a field to store image metadata
    images: [{
        filename: {
            type: String,
            required: false
        },
        filepath: {
            type: String,
            required: false
        }
        // Add more fields as needed (e.g., file size, file type)
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
