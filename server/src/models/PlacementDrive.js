import mongoose, { Schema } from 'mongoose';

const placementDriveSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    eligibleDepartments: [String],
    minCGPA: {
      type: Number,
      default: 0,
    },
    rounds: [
      {
        name: String,
        date: Date,
        description: String,
      },
    ],
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
  }
);

export const PlacementDrive = mongoose.model('PlacementDrive', placementDriveSchema);
