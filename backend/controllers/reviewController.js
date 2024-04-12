const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const getAllReviews = async (req, res) => {
  try {
    // Fetch all reviews
    const reviews = await Review.find({}).sort({ createdAt: -1 });

    if (reviews.length === 0) {
      return null;
    }

    const productIds = reviews.map((review) => review.productId);
    const userIds = reviews.map((review) => review.userId);

    const products = await Product.find({ _id: { $in: productIds } });
    const users = await User.find({ _id: { $in: userIds } });

    const reviewsWithDetails = reviews.map((review) => {
      const product = products.find(
        (product) => product._id.toString() === review.productId.toString()
      );
      const user = users.find(
        (user) => user._id.toString() === review.userId.toString()
      );
      return {
        review,
        product: {
          _id: product._id,
          title: product.title,
        },
        user: {
          _id: user._id,
          fullName: user.fullName,
        },
      };
    });

    res.status(200).json(reviewsWithDetails);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const createReview = async (req, res) => {
  const { rating, body, tags } = req.body;
  const { userId, productId } = req.params;
  if (!userId || !productId || !rating || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingReview = await Review.findOne({ userId, productId });

    const review = await Review.create({
      userId,
      productId,
      rating,
      body,
      tags,
    });

    const [product, user] = await Promise.all([
      Product.findById(productId),
      User.findById(userId),
    ]);
    
    const responseObject = {
      review: review.toObject(),
      product: product.toObject(),
      user: {
        fullName: user.fullName,
      },
    };
    
    res.status(201).json(responseObject);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create review", details: err.message });
  }
};

const voteReview = async (req, res) => {
  const { reviewId, userId, voteType } = req.body;

  try {
    let update;

    // Find the review
    const review = await Review.findById(reviewId);

    // Check if the user has already upvoted or downvoted
    const hasUpvoted = review.upvotedBy.includes(userId);
    const hasDownvoted = review.downvotedBy.includes(userId);

    if (voteType === "upvote") {
      // If the user has downvoted, remove the downvote and add the upvote
      if (hasDownvoted) {
        update = {
          $inc: { upvotes: 1, downvotes: -1 },
          $addToSet: { upvotedBy: userId },
          $pull: { downvotedBy: userId },
        };
      } else if (hasUpvoted) {
        // If the user has already upvoted and tries to upvote again, remove the upvote
        update = {
          $inc: { upvotes: -1 },
          $pull: { upvotedBy: userId },
        };
      } else {
        // If the user has not already voted, just add the upvote
        update = {
          $inc: { upvotes: 1 },
          $addToSet: { upvotedBy: userId },
        };
      }
    } else if (voteType === "downvote") {
      // If the user has upvoted, remove the upvote and add the downvote
      if (hasUpvoted) {
        update = {
          $inc: { upvotes: -1, downvotes: 1 },
          $addToSet: { downvotedBy: userId },
          $pull: { upvotedBy: userId },
        };
      } else if (hasDownvoted) {
        // If the user has already downvoted and tries to downvote again, remove the downvote
        update = {
          $inc: { downvotes: -1 },
          $pull: { downvotedBy: userId },
        };
      } else {
        // If the user has not already voted, just add the downvote
        update = {
          $inc: { downvotes: 1 },
          $addToSet: { downvotedBy: userId },
        };
      }
    } else {
      return res.status(400).json({ error: "Invalid vote type" });
    }

    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(reviewId, update, {
      new: true,
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error voting on review:", error);
    res.status(500).json({ error: "Failed to vote on review" });
  }
};

module.exports = { getAllReviews, createReview, voteReview };
