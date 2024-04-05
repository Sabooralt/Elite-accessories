const commentSchema = new Schema({
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
  });
  
  const Comment = mongoose.model('Comment', commentSchema);