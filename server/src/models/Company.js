import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      default: 'default-company.png',
    },
    website: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      enum: ['dream', 'superDream', 'regular', 'mass'],
      required: true,
    },
    description: {
      type: String,
    },
    avgPackage: {
      type: Number, // in LPA
    },
    locations: [String],
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model('Company', companySchema);
