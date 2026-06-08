import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API using RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // We can grab the token from state if we store it there, 
      // or from localStorage.
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Course', 'Job', 'Application', 'Notification'],
  endpoints: () => ({}), // Endpoints will be injected later
});
