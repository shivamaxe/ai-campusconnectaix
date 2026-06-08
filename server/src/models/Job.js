import mongoose, { Schema } from 'mongoose';

const jobSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    companyName: {
      type: String, // Denormalized for fast reads
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['fulltime', 'internship', 'contract'],
      required: true,
    },
    package: {
      ctc: Number, // Cost to Company in LPA
      stipend: Number, // For internships in INR/month
    },
    location: {
      type: String,
      required: true,
    },
    requiredSkills: [String],
    eligibilityCriteria: {
      minCGPA: {
        type: Number,
        default: 0,
      },
      eligibleDepartments: [String],
      maxBacklogs: {
        type: Number,
        default: 0,
      },
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'filled', 'draft'],
      default: 'draft',
    },
    rounds: [
      {
        name: String,
        date: Date,
        description: String,
      },
    ],
    totalApplications: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model('Job', jobSchema);
