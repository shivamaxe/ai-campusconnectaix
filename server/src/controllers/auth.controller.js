import { authService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { setCookieParams } from '../utils/token.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json(
    new ApiResponse(201, { user }, 'User registered successfully')
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

  // Set HTTP-only cookie for refresh token
  setCookieParams(res, refreshToken);

  res.status(200).json(
    new ApiResponse(
      200, 
      { user, accessToken }, 
      'Logged in successfully'
    )
  );
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (req.user && refreshToken) {
    await authService.logoutUser(req.user._id, refreshToken);
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json(
    new ApiResponse(200, null, 'Logged out successfully')
  );
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshTokenCookie = req.cookies.refreshToken;
  
  const { accessToken, refreshToken } = await authService.refreshToken(refreshTokenCookie);

  // Set new rotated refresh token
  setCookieParams(res, refreshToken);

  res.status(200).json(
    new ApiResponse(200, { accessToken }, 'Token refreshed successfully')
  );
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'User fetched successfully')
  );
});
