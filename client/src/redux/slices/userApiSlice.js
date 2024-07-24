import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      updateUser: builder.mutation({
        query: (data) => ({
          url: '/user/profile',
          method: 'PUT',
          body: data,
          credentials: 'include',
        }),
      }),
      getTeamList: builder.query({
        query: () => ({
          url: '/user/get-team',
          method: 'GET',
          credentials: 'include',
        }),
      }),
      getNotifications: builder.query({
        query: () => ({
          url: '/user/notifications',
          method: 'GET',
          credentials: 'include',
        }),
      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/user/${id}`,
          method: 'DELETE',
          credentials: 'include',
        }),
      }),
      userAction: builder.mutation({
        query: (data) => ({
          url: `/user/${data.id}`,
          method: 'PUT',
          body:data,
          credentials: 'include',
        }),
      }),
      markNotisRead: builder.mutation({
        query: (data) => ({
          url: `/user/read-noti?isreadType=${data.type}&id=${data?.id}`,
          method: 'PUT',
          body:data,
          credentials: 'include',
        }),
      }),
      changePassword: builder.mutation({
        query: (data) => ({
          url: '/user/change-password',
          method: 'PUT',
          body:data,
          credentials: 'include',
        }),
      }),
    }),
  });

  export const {
    useUpdateUserMutation,
    useGetTeamListQuery,
    useDeleteUserMutation,
    useUserActionMutation,
    useMarkNotisReadMutation,
    useChangePasswordMutation,
    useGetNotificationsQuery
  } = userApiSlice;