import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  try {
    const { conversationId, desc } = req.body;

    const newMessage = new Message({
      conversationId,
      userId: req.userId,
      desc,
    });

    const savedMessage = await newMessage.save();

    await Conversation.findOneAndUpdate(
      { id: conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: desc,
        },
      },
      { new: true }
    );

    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });

    if (!messages || messages.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

