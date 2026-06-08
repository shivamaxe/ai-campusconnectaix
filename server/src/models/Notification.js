import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['placement', 'academic', 'system', 'chat'],
      default: 'system',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    link: String, // Optional URL to navigate to when clicked
  },
  {
    timestamps: true,
  }
);

// Index for getting user notifications quickly
notificationSchema.index({ userId: 1, createdAt: -1 });

export const Notification = mongoose.model('Notification', notificationSchema);
