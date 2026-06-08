import mongoose, { Schema } from 'mongoose';

const resumeSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    aiAnalysis: {
      parsedText: String,
      skillsFound: [String],
      experience: [
        {
          title: String,
          company: String,
          duration: String,
          description: String,
        },
      ],
      education: [
        {
          institution: String,
          degree: String,
          cgpa: String,
        },
      ],
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    suggestions: [
      {
        category: String, // e.g., 'Formatting', 'Keywords', 'Action Verbs'
        feedback: String,
      },
    ],
    analyzedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model('Resume', resumeSchema);
