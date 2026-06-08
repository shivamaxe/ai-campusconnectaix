import mongoose, { Schema } from 'mongoose';
import { User } from './User.js';

const studentSchema = new Schema({
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      date: Date,
      url: String,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      githubUrl: String,
      liveUrl: String,
    },
  ],
  linkedinUrl: String,
  githubUrl: String,
  placementStatus: {
    type: String,
    enum: ['unplaced', 'placed', 'opted-out'],
    default: 'unplaced',
  },
  resumeUrl: String,
});

// Student inherits from User
export const Student = User.discriminator('student', studentSchema);
