import { AuditLog } from '../models/AuditLog.js';

export const auditLogger = (action, resource) => {
  return async (req, res, next) => {
    // Intercept the response finish event
    res.on('finish', async () => {
      // Only log successful operations (POST, PUT, DELETE typically)
      if (res.statusCode >= 200 && res.statusCode < 400 && req.method !== 'GET') {
        try {
          await AuditLog.create({
            userId: req.user ? req.user._id : null,
            action,
            resource,
            resourceId: req.params.id || null, // Best effort to capture resource ID
            ipAddress: req.ip,
            userAgent: req.get('user-agent'),
            details: {
              method: req.method,
              url: req.originalUrl,
              body: req.method !== 'GET' ? req.body : undefined // Avoid logging large GET bodies
            }
          });
        } catch (error) {
          console.error('Audit Log Error:', error);
        }
      }
    });
    
    next();
  };
};
