import mongoose, { Schema } from 'mongoose';

const applicationSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    studentName: String, // Denormalized for fast list views
    jobTitle: String, // Denormalized
    companyName: String, // Denormalized
    
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
    },
    
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'interviewing', 'selected', 'rejected', 'withdrawn'],
      default: 'applied',
    },
    
    currentRound: {
      type: Number,
      default: 1,
    },
    
    aiScore: {
      type: Number,
      min: 0,
      max: 100,
      description: 'AI computed match score between student and job requirements',
    },
    
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    
    interviewRounds: [
      {
        roundNumber: Number,
        roundName: String,
        status: {
          type: String,
          enum: ['pending', 'passed', 'failed'],
          default: 'pending',
        },
        feedback: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a student can only apply once to a job
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
