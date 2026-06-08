import { ChatMessage } from '../models/ChatMessage.js';
import { Notification } from '../models/Notification.js';

export const handleChat = (io, socket) => {
  // Listen for new messages
  socket.on('send_message', async (data) => {
    try {
      const { receiverId, message, senderId } = data;

      // Save to database
      const newMessage = await ChatMessage.create({
        senderId,
        receiverId,
        message,
      });

      // Emit to receiver's room if they are online
      io.to(receiverId.toString()).emit('receive_message', newMessage);
      
      // Also send notification
      const notification = await Notification.create({
        userId: receiverId,
        title: 'New Message',
        message: `You have a new message.`,
        type: 'chat',
      });
      io.to(receiverId.toString()).emit('new_notification', notification);

    } catch (error) {
      console.error('Socket Chat Error:', error);
    }
  });

  socket.on('mark_read', async (data) => {
    try {
      const { messageId } = data;
      await ChatMessage.findByIdAndUpdate(messageId, { isRead: true });
    } catch (error) {
      console.error('Socket Mark Read Error:', error);
    }
  });
};
