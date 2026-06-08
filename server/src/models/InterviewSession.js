import mongoose, { Schema } from 'mongoose';

const interviewSessionSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    type: {
      type: String,
      enum: ['technical', 'hr', 'behavioral'],
      required: true,
    },
    domain: String, // e.g., 'ReactJS', 'System Design'
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    questions: [
      {
        questionText: String,
        expectedKeywords: [String],
      },
    ],
    answers: [
      {
        questionId: Schema.Types.ObjectId, // ref to question array element
        userAnswer: String,
        timeTaken: Number, // in seconds
      },
    ],
    evaluation: [
      {
        questionId: Schema.Types.ObjectId,
        score: {
          type: Number,
          min: 0,
          max: 10,
        },
        feedback: String,
        missingKeywords: [String],
      },
    ],
    readinessScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    overallFeedback: String,
    conductedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);
