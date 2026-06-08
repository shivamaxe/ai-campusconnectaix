import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API using RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken') || '';
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Course', 'Job', 'Application', 'Notification', 'Analytics', 'AI'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // AI
    getCareerAdvice: builder.mutation({
      query: (data) => ({
        url: '/ai/career-coach',
        method: 'POST',
        body: data,
      }),
    }),
    getPlacementPrediction: builder.mutation({
      query: () => ({
        url: '/ai/placement-predict',
        method: 'POST',
        body: {},
      }),
    }),
    getSkillGap: builder.mutation({
      query: (data) => ({
        url: '/ai/skill-gap',
        method: 'POST',
        body: data,
      }),
    }),

    // Jobs
    getJobs: builder.query({
      query: () => '/jobs',
      providesTags: ['Job'],
    }),
    applyForJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/${jobId}/apply`,
        method: 'POST',
      }),
      invalidatesTags: ['Job', 'Application'],
    }),

    // Courses
    getCourses: builder.query({
      query: () => '/courses',
      providesTags: ['Course'],
    }),

    // Analytics
    getAnalytics: builder.query({
      query: () => '/analytics/university',
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetCareerAdviceMutation,
  useGetPlacementPredictionMutation,
  useGetSkillGapMutation,
  useGetJobsQuery,
  useApplyForJobMutation,
  useGetCoursesQuery,
  useGetAnalyticsQuery,
} = api;
