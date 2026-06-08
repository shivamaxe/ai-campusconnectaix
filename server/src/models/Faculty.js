import mongoose, { Schema } from 'mongoose';
import { User } from './User.js';

const facultySchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  designation: {
    type: String,
    enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Guest Faculty'],
    required: true,
  },
  specializations: [
    {
      type: String,
      trim: true,
    },
  ],
  isHod: {
    type: Boolean,
    default: false,
  },
});

// Faculty inherits from User
export const Faculty = User.discriminator('faculty', facultySchema);
