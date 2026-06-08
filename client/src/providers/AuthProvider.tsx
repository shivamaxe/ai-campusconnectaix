import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { api } from '../store/api';
import { setUser, logout } from '../store/authSlice';

const AuthContext = createContext<{
  isLoading: boolean;
}>({ isLoading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (token && !user) {
        try {
          const res = await fetch('http://localhost:5000/api/v1/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            dispatch(setUser(data.data.user));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      }
      setIsLoading(false);
    };

    fetchMe();
  }, [token, user, dispatch]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
