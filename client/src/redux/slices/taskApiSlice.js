// import { apiSlice } from './apiSlice';

// export const taskApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
      
//       getDashBoardStats: builder.query({
//         query: () => ({
//           url: '/task/dashboard',
//           method: 'GET',
//           credentials: 'include',
//         }),
//       }),
//       getAllTasks: builder.query({
//         query: (stage) => ({
//           url: `/task/${stage}`,
//           method: 'GET',
//           credentials: 'include',
//         }),
//       }),
      
//     }),
//   });

//   export const {
//     useGetDashBoardStatsQuery,
//     useGetAllTasksQuery
//   } = taskApiSlice;

import { apiSlice } from './apiSlice';

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashBoardStats: builder.query({
      query: () => ({
        url: '/task/dashboard',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getAllTasks: builder.query({
      query: ({stage = '',id}) => ({
        url: stage ? `/task/${stage}/${id}` : `task/${id}`, // Adjust URL based on presence of stage
        method: 'GET',
        credentials: 'include',
      }),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: '/task/create',
        method: 'POST',
        body:data,
        credentials: 'include',
      }),
    }),
    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `/task/duplicate/${id}`,
        method: 'POST',
        body:{},
        credentials: 'include',
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/task/update/${data._id}`,
        method: 'PUT',
        body:data,
        credentials: 'include',
      }),
    }),
    getTaskByID: builder.query({
      query: ({tid}) => ({
        url: `/task/by-id/id/${tid}`, // Adjust URL based on presence of stage
        method: 'GET',
        credentials: 'include',
      }),
    }),
    trashTask: builder.mutation({
      query: ({id}) => ({
        url: `/task/trash/${id}`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
    createSubTask: builder.mutation({
      query: ({data,id}) => ({
        url: `/task/create-subtask/${id}`,
        method: 'PUT',
        body:data,
        credentials: 'include',
      }),
    }),
    postTaskActivity: builder.mutation({
      query: ({data,id}) => ({
        url: `/task/activity/${id}`,
        method:'POST',
        body:data,
        credentials: "include",
      })
    }),
    deleteRestoreTask: builder.mutation({
      query: ({id, actionType }) => ({
        url: `/task/delete-restore/${id}?actionType=${actionType}`,
        method:'DELETE',
        credentials: "include",
      })
    }),
    leavTask: builder.mutation({
      query: ({ id }) => ({
        url: `/task/leave/${id}`,
        method:'DELETE',
        credentials: "include",
      })
    })
    // getTrashTasks: builder.query({
    //   query: ({id}) => ({
    //     url: `/task/trashed/${id}`, // Adjust URL based on presence of stage
    //     method: 'GET',
    //     credentials: 'include',
    //   }),
    // }),
  }),
  
});

export const {
  useGetDashBoardStatsQuery,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useGetTaskByIDQuery,
  useTrashTaskMutation,
  useCreateSubTaskMutation,
  usePostTaskActivityMutation,
  useDeleteRestoreTaskMutation,
  useLeavTaskMutation
  // useGetTrashTasksQuery
} = taskApiSlice;
