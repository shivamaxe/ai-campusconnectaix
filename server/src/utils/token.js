import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });
};

export const generateRefreshToken = () => {
  return {
    token: crypto.randomBytes(40).toString('hex'),
    family: crypto.randomBytes(20).toString('hex'),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };
};

export const setCookieParams = (res, token, name = 'refreshToken') => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRY) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res.cookie(name, token, cookieOptions);
};
