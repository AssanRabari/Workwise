import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

//Create Payment Intent + Order
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found."));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const query = req.isSeller
      ? { sellerId: req.userId }
      : { buyerId: req.userId };

    const orders = await Order.find({
      ...query,
      isCompleted: true,
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { isCompleted: true } },
      { new: true }
    );

    if (!updatedOrder) {
      return next(createError(404, "Order not found."));
    }

    res.status(200).json({ message: "Order has been confirmed." });
  } catch (error) {
    next(error);
  }
};