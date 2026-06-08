import { User } from '../models/User.js';
import { Student } from '../models/Student.js';
import { Faculty } from '../models/Faculty.js';
import { ApiError } from '../utils/ApiError.js';
import { signAccessToken, generateRefreshToken } from '../utils/token.js';
import mongoose from 'mongoose';

class AuthService {
  async registerUser(userData) {
    // Check if user exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    let user;
    const { role } = userData;

    if (role === 'student') {
      // For student registration, create via the Student discriminator
      // Provide sensible defaults for required discriminator fields
      user = await Student.create({
        ...userData,
        rollNumber: userData.rollNumber || `STU${Date.now()}`,
        departmentId: userData.departmentId || new mongoose.Types.ObjectId(),
        semester: userData.semester || 1,
      });
    } else if (role === 'faculty') {
      // For faculty registration, create via the Faculty discriminator
      user = await Faculty.create({
        ...userData,
        employeeId: userData.employeeId || `FAC${Date.now()}`,
        departmentId: userData.departmentId || new mongoose.Types.ObjectId(),
        designation: userData.designation || 'Assistant Professor',
      });
    } else {
      // For admin, recruiter, tpo — insert directly (no discriminator registered)
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash(userData.password, 12);
      
      const result = await mongoose.connection.collection('users').insertOne({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        role: role,
        avatar: 'default.jpg',
        isActive: true,
        refreshTokens: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      user = await User.findById(result.insertedId);
    }

    // Don't return password
    if (user) user.password = undefined;
    return user;
  }

  async loginUser(email, password) {
    // 1) Check if email and password exist
    if (!email || !password) {
      throw new ApiError(400, 'Please provide email and password');
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    // 3) Create Tokens
    const accessToken = signAccessToken(user._id);
    const refreshTokenData = generateRefreshToken();

    // 4) Save refresh token in DB
    user.refreshTokens.push(refreshTokenData);
    await user.save({ validateBeforeSave: false });

    user.password = undefined;

    return {
      user,
      accessToken,
      refreshToken: refreshTokenData.token,
    };
  }

  async logoutUser(userId, refreshToken) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User not found');

    // Remove the specific refresh token
    user.refreshTokens = user.refreshTokens.filter(
      (rt) => rt.token !== refreshToken
    );
    await user.save({ validateBeforeSave: false });

    return true;
  }

  async refreshToken(token) {
    if (!token) {
      throw new ApiError(401, 'Refresh token not found. Please log in again.');
    }

    // Find user with this token
    const user = await User.findOne({ 'refreshTokens.token': token });

    if (!user) {
      throw new ApiError(403, 'Invalid refresh token');
    }

    const existingTokenIndex = user.refreshTokens.findIndex(rt => rt.token === token);
    const existingToken = user.refreshTokens[existingTokenIndex];

    if (new Date() > new Date(existingToken.expiresAt)) {
      // Remove expired token
      user.refreshTokens.splice(existingTokenIndex, 1);
      await user.save({ validateBeforeSave: false });
      throw new ApiError(403, 'Refresh token expired. Please log in again.');
    }

    // Generate new tokens (Rotation)
    const newAccessToken = signAccessToken(user._id);
    const newRefreshTokenData = generateRefreshToken();
    newRefreshTokenData.family = existingToken.family;

    // Replace old refresh token with new one
    user.refreshTokens[existingTokenIndex] = newRefreshTokenData;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenData.token,
    };
  }
}

export const authService = new AuthService();
