import mongoose, { Schema } from 'mongoose';

const auditLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    action: {
      type: String,
      required: true,
    },
    resource: {
      type: String, // e.g., 'Job', 'Student', 'Settings'
      required: true,
    },
    resourceId: Schema.Types.ObjectId,
    details: {
      type: Schema.Types.Mixed, // stores old/new values
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by admin
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ userId: 1, action: 1 });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
