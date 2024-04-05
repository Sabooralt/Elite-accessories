const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true },
    body: { type: String, required: true },
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    },
    upvotedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    tags: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  }, { timestamps: true });
  

module.exports = mongoose.model('Review', reviewSchema);
