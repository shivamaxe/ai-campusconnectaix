import { ApiError } from '../utils/ApiError.js';
import { ROLE_PERMISSIONS } from '../config/permissions.js';

/**
 * Middleware to check if user has required permissions
 * @param {...string} requiredPermissions - Permissions required to access the route
 */
export const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ApiError(403, 'User role not found. Access denied.'));
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    
    // Admin bypass
    if (req.user.role === 'admin') {
      return next();
    }

    const hasPermission = requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return next(
        new ApiError(403, 'You do not have permission to perform this action')
      );
    }

    next();
  };
};
