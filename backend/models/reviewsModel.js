const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    userId : {

    },
    productId:{

    }
    
}, { timestamps: true });

module.exports = mongoose.model('Reviews', reviewsSchema);
