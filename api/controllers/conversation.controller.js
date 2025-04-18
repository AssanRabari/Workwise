import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  try {
    const { to } = req.body;
    const isSeller = req.isSeller;
    const userId = req.userId;

    const conversationId = isSeller ? userId + to : to + userId;

    const newConversation = new Conversation({
      id: conversationId,
      sellerId: isSeller ? userId : to,
      buyerId: isSeller ? to : userId,
      readBySeller: isSeller,
      readByBuyer: !isSeller,
    });

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    next(error);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updateFields = req.isSeller
      ? { readBySeller: true }
      : { readByBuyer: true };

    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json(updatedConversation);
  } catch (error) {
    next(error);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });

    if (!conversation) {
      return next(createError(404, "Conversation not found"));
    }

    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const filter = req.isSeller
      ? { sellerId: req.userId }
      : { buyerId: req.userId };

    const conversations = await Conversation.find(filter).sort({
      updatedAt: -1,
    });

    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
