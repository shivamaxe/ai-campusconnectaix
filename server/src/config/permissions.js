export const PERMISSIONS = {
  // Student permissions
  STUDENT_READ: 'student:read',
  STUDENT_WRITE: 'student:write',
  
  // Faculty permissions
  COURSE_MANAGE: 'course:manage',
  ATTENDANCE_MARK: 'attendance:mark',
  ASSIGNMENT_MANAGE: 'assignment:manage',
  
  // Recruiter permissions
  JOB_MANAGE: 'job:manage',
  APPLICATION_REVIEW: 'application:review',
  
  // TPO permissions
  PLACEMENT_MANAGE: 'placement:manage',
  COMPANY_MANAGE: 'company:manage',
  
  // Admin permissions
  USER_MANAGE: 'user:manage',
  DEPARTMENT_MANAGE: 'department:manage',
  SYSTEM_CONFIG: 'system:config',
  
  // Global View
  ANALYTICS_VIEW: 'analytics:view'
};

export const ROLE_PERMISSIONS = {
  student: [
    PERMISSIONS.STUDENT_READ,
    PERMISSIONS.STUDENT_WRITE
  ],
  faculty: [
    PERMISSIONS.STUDENT_READ,
    PERMISSIONS.COURSE_MANAGE,
    PERMISSIONS.ATTENDANCE_MARK,
    PERMISSIONS.ASSIGNMENT_MANAGE,
    PERMISSIONS.ANALYTICS_VIEW
  ],
  recruiter: [
    PERMISSIONS.STUDENT_READ,
    PERMISSIONS.JOB_MANAGE,
    PERMISSIONS.APPLICATION_REVIEW
  ],
  tpo: [
    PERMISSIONS.STUDENT_READ,
    PERMISSIONS.PLACEMENT_MANAGE,
    PERMISSIONS.COMPANY_MANAGE,
    PERMISSIONS.ANALYTICS_VIEW
  ],
  admin: Object.values(PERMISSIONS) // Admin gets all permissions
};
