import { ChatMessage } from '../models/ChatMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getConversation = asyncHandler(async (req, res) => {
  const { otherUserId } = req.params;
  const currentUserId = req.user._id;

  const messages = await ChatMessage.find({
    $or: [
      { senderId: currentUserId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: currentUserId },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json(new ApiResponse(200, { data: messages }, 'Conversation fetched successfully'));
});

export const getChatContacts = asyncHandler(async (req, res) => {
  // Find users the current user has chatted with
  const currentUserId = req.user._id;

  const messages = await ChatMessage.find({
    $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
  })
    .sort({ createdAt: -1 })
    .populate('senderId', 'firstName lastName avatar role')
    .populate('receiverId', 'firstName lastName avatar role');

  const contactsMap = new Map();

  messages.forEach((msg) => {
    const contact = msg.senderId._id.equals(currentUserId) ? msg.receiverId : msg.senderId;
    if (!contactsMap.has(contact._id.toString())) {
      contactsMap.set(contact._id.toString(), {
        contact,
        lastMessage: msg.message,
        lastMessageAt: msg.createdAt,
        unreadCount: msg.receiverId._id.equals(currentUserId) && !msg.isRead ? 1 : 0,
      });
    } else {
      if (msg.receiverId._id.equals(currentUserId) && !msg.isRead) {
        contactsMap.get(contact._id.toString()).unreadCount += 1;
      }
    }
  });

  const contacts = Array.from(contactsMap.values());

  res.status(200).json(new ApiResponse(200, { data: contacts }, 'Contacts fetched successfully'));
});
