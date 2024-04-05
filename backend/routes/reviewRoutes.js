const express = require("express")

const {getAllReviews,createReview,voteReview} = require('../controllers/reviewController');

const router = express.Router();



router.get('/',getAllReviews);
router.post('/add/:userId/:productId',createReview);
router.post('/vote', voteReview);


module.exports = router