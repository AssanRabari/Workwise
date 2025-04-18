import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError(403, "Sellers can't create a review!"));
  }

  try {
    const { gigId, desc, star } = req.body;

    const existingReview = await Review.findOne({
      gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return next(createError(403, "You have already created a review for this gig!"));
    }

    // TODO: Verify if user purchased the gig before allowing the review

    const newReview = new Review({
      userId: req.userId,
      gigId,
      desc,
      star,
    });

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(gigId, {
      $inc: { totalStars: star, starNumber: 1 },
    });

    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};


export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });

    if (!reviews || reviews.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(createError(404, "Review not found."));
    }

    if (review.userId.toString() !== req.userId) {
      return next(createError(403, "You can delete only your review!"));
    }

    await Review.findByIdAndDelete(req.params.id);

    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    res.status(200).json({ message: "Review has been deleted." });
  } catch (error) {
    next(error);
  }
};
