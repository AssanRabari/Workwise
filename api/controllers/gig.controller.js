import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  try {
    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });

    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found!"));
    }

    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your gig!"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found!"));
    }

    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  const { userId, cat, min, max, search, sort } = req.query;

  const filters = {
    ...(userId && { userId }),
    ...(cat && { cat }),
    ...((min || max) && {
      price: {
        ...(min && { $gt: min }),
        ...(max && { $lt: max }),
      },
    }),
    ...(search && {
      title: { $regex: search, $options: "i" },
    }),
  };

  try {
    const gigs = await Gig.find(filters).sort(sort ? { [sort]: -1 } : {});
    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};