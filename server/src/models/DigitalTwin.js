import mongoose, { Schema } from 'mongoose';

const digitalTwinSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      unique: true,
    },
    academicMetrics: {
      attendanceRate: Number,
      assignmentCompletionRate: Number,
      avgAssignmentScore: Number,
      cgpaTrend: [Number], // array of CGPAs across semesters
    },
    skillMetrics: {
      topSkills: [String],
      skillGrowthRate: Number, // custom metric computed by AI
      missingIndustrySkills: [String],
    },
    placementMetrics: {
      placementProbability: Number,
      applicationsSubmitted: Number,
      shortlistRate: Number,
      interviewClearanceRate: Number,
    },
    learningBehavior: {
      preferredLearningTimes: [String], // e.g., 'Evening', 'Weekend'
      engagementScore: Number,
    },
    predictions: [
      {
        category: String, // e.g., 'Placement', 'Academic Risk'
        predictionText: String,
        confidenceScore: Number,
        generatedAt: Date,
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const DigitalTwin = mongoose.model('DigitalTwin', digitalTwinSchema);
